import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function baseProps(size: number): SVGProps<SVGSVGElement> {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true,
  };
}

export function IconGlobe({ size = 22, className, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} className={className} {...rest}>
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M2.5 12h19M12 2.5c2.8 3.2 4.3 6.4 4.3 9.5S14.8 18.3 12 21.5c-2.8-3.2-4.3-6.4-4.3-9.5S9.2 5.7 12 2.5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

export function IconHome({ size = 22, className, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} className={className} {...rest}>
      <path d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5H5.5A1.5 1.5 0 0 1 4 19V10.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9.5 20.5v-6h5v6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function IconDoc({ size = 22, className, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} className={className} {...rest}>
      <path
        d="M7.5 3.5h6.2L18.5 8.3V20.5H7.5a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M13.5 3.6V8h4.9" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M9.5 12h5M9.5 15.5h5M9.5 19h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

export function IconScreen({ size = 22, className, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} className={className} {...rest}>
      <rect x="3" y="4" width="18" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 20.5h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 17v3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M6 8.5h12M6 11.5h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}

export function IconFlask({ size = 22, className, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} className={className} {...rest}>
      <path d="M9 3.5h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M10 3.5v5.2L6.2 17.4A2 2 0 0 0 8 20.5h8a2 2 0 0 0 1.8-2.9L14 8.7V3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M8 14.5h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}

export function IconSearch({ size = 20, className, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} className={className} {...rest}>
      <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M15.2 15.2L20 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconKeyboard({ size = 20, className, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} className={className} {...rest}>
      <rect x="3" y="6" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6.5 9h2M10.5 9h2M14.5 9h2M6.5 12h3M11 12h2M14.5 12h2M6.5 15h11"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

export function IconJoystick({ size = 22, className, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} className={className} {...rest}>
      <rect x="4" y="8" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 8V5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="4" r="1.8" fill="currentColor" />
      <circle cx="9" cy="13.5" r="1.6" fill="currentColor" opacity="0.45" />
      <circle cx="15" cy="13.5" r="1.6" fill="currentColor" opacity="0.45" />
    </svg>
  );
}

export function IconGauge({ size = 20, className, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size)} className={className} {...rest}>
      <path d="M4 15a8 8 0 1 1 16 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 15V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="15" r="1.4" fill="currentColor" />
    </svg>
  );
}
