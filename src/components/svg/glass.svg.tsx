import { SVGProps } from 'react';
const GlassSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={50}
    height={50}
    stroke="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="m21 21-4.35-4.35M15 10a5 5 0 1 1-10 0 5 5 0 0 1 10 0z" />
  </svg>
);
export default GlassSvg;
