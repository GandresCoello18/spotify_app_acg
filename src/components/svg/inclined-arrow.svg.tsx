import { SVGProps } from 'react';

export const SvgInclinedArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={275}
    height={275}
    fill="none"
    viewBox="0 0 464 465"
    {...props}
  >
    <path
      fill="#D6F379"
      d="M464 0H93.5v101.5h198L0 393l71.5 71.5 292-292v216H464V0Z"
    />
  </svg>
);
