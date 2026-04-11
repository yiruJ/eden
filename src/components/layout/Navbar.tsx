import { CardNav } from '../ui/CardNav';
import logo from '../../assets/logo.png';

const mobileNavItems = [
  {
    label: 'Get Started',
    bgColor: '#2C2C2A',
    textColor: '#ffffff',
    links: [
      { label: 'Pricing', to: '/pricing' },
      { label: 'Contact', to: '/contact' },
      { label: 'Book a Trial', to: '/enrol' },
    ],
  },
  {
    label: 'Programs',
    bgColor: '#4aaf81',
    textColor: '#ffffff',
    links: [
      { label: 'All Programs', to: '/programs' },
      { label: 'Instruments', to: '/instruments' },
    ],
  },
  {
    label: 'About Eden',
    bgColor: '#E8D5B0',
    textColor: '#1a1a1a',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Our Teachers', to: '/teachers' },
    ],
  },
];

export function Navbar() {

  return (
    <CardNav
      logo={logo}
      logoAlt="Eden Music Academy"
      items={mobileNavItems}
      baseColor="#EAF2E8"
    />
  );
}
