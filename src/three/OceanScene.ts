import * as THREE from 'three';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';

export class OceanScene {
  private container: HTMLElement;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private water!: Water;
  private sun!: THREE.Vector3;
  private sky!: Sky;
  
  private reqId: number | null = null;
  private isVisible: boolean = true;
  private observer: IntersectionObserver | null = null;

  // Mouse & Touch Parallax tracking
  private mouseX: number = 0;
  private mouseY: number = 0;
  private targetMouseX: number = 0;
  private targetMouseY: number = 0;
  private mouseVelocity: number = 0;
  private lastMouseX: number = 0;
  private lastMouseY: number = 0;

  constructor(container: HTMLElement) {
    this.container = container;
    this.init();
  }

  private init(): void {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(55, width / height, 1, 20000);
    this.camera.position.set(0, 30, 100);

    // 3. Sun Vector (Bright Midday Sun over Muscat)
    this.sun = new THREE.Vector3();
    const elevation = 42; // degrees
    const azimuth = 180;  // degrees
    const phi = THREE.MathUtils.degToRad(90 - elevation);
    const theta = THREE.MathUtils.degToRad(azimuth);
    this.sun.setFromSphericalCoords(1, phi, theta);

    // 4. Procedural Water Normals Texture
    const waterNormals = this.generateWaveNormals(512);

    // 5. Water Plane
    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
    this.water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: waterNormals,
      sunDirection: this.sun.clone().normalize(),
      sunColor: 0xffffff,
      waterColor: 0x2473AB, // Osan Brand Blue!
      distortionScale: 2.8,
      fog: false,
    });
    this.water.rotation.x = -Math.PI / 2;
    this.scene.add(this.water);

    // 6. Sky & Atmospheric Scattering
    this.sky = new Sky();
    this.sky.scale.setScalar(10000);
    this.scene.add(this.sky);

    const skyUniforms = this.sky.material.uniforms;
    skyUniforms['turbidity'].value = 2.0;       // Crisp, clear atmospheric clarity
    skyUniforms['rayleigh'].value = 0.85;       // Soft blue daylight dispersion
    skyUniforms['mieCoefficient'].value = 0.005;
    skyUniforms['mieDirectionalG'].value = 0.8;
    skyUniforms['sunPosition'].value.copy(this.sun);

    // 7. Ambient Lighting for crisp water specular highlights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.copy(this.sun).multiplyScalar(100);
    this.scene.add(dirLight);

    // 8. WebGL Renderer
    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.75);

    this.renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
      precision: isMobile ? 'mediump' : 'highp',
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(dpr);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.88;

    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';
    this.renderer.domElement.style.display = 'block';
    this.container.appendChild(this.renderer.domElement);

    // 9. Event Listeners
    this.setupEvents();

    // 10. Start Animation Loop
    this.animate();
  }

  /**
   * Generates a multi-octave seamless normal map for realistic ocean surface waves
   */
  private generateWaveNormals(size: number): THREE.DataTexture {
    const data = new Uint8Array(size * size * 4);

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        // Multi-frequency wave synthesis
        const u = (x / size) * Math.PI * 2;
        const v = (y / size) * Math.PI * 2;

        const w1 = Math.sin(u * 6 + v * 4) * 0.35;
        const w2 = Math.sin(u * 12 - v * 8) * 0.25;
        const w3 = Math.sin(u * 20 + v * 16) * 0.15;
        const w4 = Math.cos(u * 3 - v * 5) * 0.25;

        const dx = (Math.cos(u * 6 + v * 4) * 6 * 0.35 +
                    Math.cos(u * 12 - v * 8) * 12 * 0.25 +
                    Math.cos(u * 20 + v * 16) * 20 * 0.15 -
                    Math.sin(u * 3 - v * 5) * 3 * 0.25) * 0.05;

        const dy = (Math.cos(u * 6 + v * 4) * 4 * 0.35 -
                    Math.cos(u * 12 - v * 8) * 8 * 0.25 +
                    Math.cos(u * 20 + v * 16) * 16 * 0.15 +
                    Math.sin(u * 3 - v * 5) * 5 * 0.25) * 0.05;

        const nx = -dx;
        const ny = -dy;
        const nz = 1.0;
        const len = Math.hypot(nx, ny, nz);

        const index = (y * size + x) * 4;
        data[index] = Math.floor(((nx / len) * 0.5 + 0.5) * 255);
        data[index + 1] = Math.floor(((ny / len) * 0.5 + 0.5) * 255);
        data[index + 2] = Math.floor((nz / len) * 255);
        data[index + 3] = 255;
      }
    }

    const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.needsUpdate = true;
    return texture;
  }

  private setupEvents(): void {
    // Window Resize
    window.addEventListener('resize', this.onResize, { passive: true });

    // Mouse Movement
    window.addEventListener('mousemove', (e: MouseEvent) => {
      this.targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      this.targetMouseY = (e.clientY / window.innerHeight) * 2 - 1;
    }, { passive: true });

    // Touch Support for Mobile
    window.addEventListener('touchmove', (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        this.targetMouseX = (touch.clientX / window.innerWidth) * 2 - 1;
        this.targetMouseY = (touch.clientY / window.innerHeight) * 2 - 1;
      }
    }, { passive: true });

    // IntersectionObserver to pause loop when scrolled past
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            this.isVisible = entry.isIntersecting;
            if (this.isVisible && !this.reqId) {
              this.animate();
            }
          });
        },
        { threshold: 0.05 }
      );
      this.observer.observe(this.container);
    }
  }

  private onResize = (): void => {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  };

  private animate = (): void => {
    if (!this.isVisible) {
      this.reqId = null;
      return;
    }

    this.reqId = requestAnimationFrame(this.animate);

    // 1. Advance Water Wave Time
    if (this.water.material.uniforms['time']) {
      this.water.material.uniforms['time'].value += 1.0 / 60.0;
    }

    // 2. Smooth Lerp Mouse / Touch Coordinates
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.04;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.04;

    // Track velocity for subtle wave disturbance
    const dX = this.mouseX - this.lastMouseX;
    const dY = this.mouseY - this.lastMouseY;
    const speed = Math.hypot(dX, dY);
    this.mouseVelocity += (speed - this.mouseVelocity) * 0.1;
    this.lastMouseX = this.mouseX;
    this.lastMouseY = this.mouseY;

    // 3. Gentle Camera Parallax & Horizon Shift
    const targetCamX = this.mouseX * 35;
    const targetCamY = 28 + this.mouseY * 12;
    const targetCamZ = 100 - this.mouseY * 15;

    this.camera.position.x += (targetCamX - this.camera.position.x) * 0.05;
    this.camera.position.y += (targetCamY - this.camera.position.y) * 0.05;
    this.camera.position.z += (targetCamZ - this.camera.position.z) * 0.05;

    // Look slightly towards the glistening ocean horizon
    this.camera.lookAt(this.mouseX * 20, 15, -400);

    // 4. Subtle Wave distortion reaction
    if (this.water.material.uniforms['distortionScale']) {
      this.water.material.uniforms['distortionScale'].value = 2.8 + Math.min(this.mouseVelocity * 10, 1.2);
    }

    // 5. Render
    this.renderer.render(this.scene, this.camera);
  };

  public destroy(): void {
    if (this.reqId) {
      cancelAnimationFrame(this.reqId);
      this.reqId = null;
    }

    window.removeEventListener('resize', this.onResize);

    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    // Clean up Three.js resources
    this.scene.clear();
    this.water.geometry.dispose();
    this.renderer.dispose();

    if (this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
}

