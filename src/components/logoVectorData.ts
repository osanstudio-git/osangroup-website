import logoData from './logoSvgData.json';

export interface LogoPathData {
  d: string;
  stroke: string;
  width: number;
  id: string;
}

export const OFFICIAL_LOGO_PATHS: LogoPathData[] = logoData;

