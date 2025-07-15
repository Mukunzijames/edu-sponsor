import Link from "next/link";

interface FooterLinkProps {
  href: string;
  label: string;
}

function FooterLink({ href, label }: FooterLinkProps) {
  return (
    <li>
      <Link href={href} className="opacity-80 hover:opacity-100">
        {label}
      </Link>
    </li>
  );
}

interface FooterColumnProps {
  title: string;
  links: { href: string; label: string }[];
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="font-semibold mb-4">{title}</h3>
      <ul className="space-y-2 text-sm">
        {links.map((link, index) => (
          <FooterLink key={index} href={link.href} label={link.label} />
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const columns = [
    {
      title: "About Us",
      links: [
        { href: "#", label: "Our Story" },
        { href: "#", label: "Impact Stories" },
        { href: "#", label: "Our Team" },
        { href: "#", label: "Press Coverage" },
      ],
    },
    {
      title: "Our Information",
      links: [
        { href: "#", label: "Privacy Policy" },
        { href: "#", label: "Terms & Conditions" },
        { href: "#", label: "Site Map" },
        { href: "#", label: "Help Center" },
      ],
    },
    {
      title: "My Account",
      links: [
        { href: "#", label: "Press Inquiries" },
        { href: "#", label: "Social Media" },
        { href: "#", label: "Images & B-roll" },
        { href: "#", label: "Permissions" },
      ],
    },
    {
      title: "Policy",
      links: [
        { href: "#", label: "Application Security" },
        { href: "#", label: "Software Principles" },
        { href: "#", label: "Responsible Supply Chain" },
        { href: "#", label: "Responsible Disclosure" },
      ],
    },
  ];

  return (
    <footer className="bg-indigo-600 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {columns.map((column, index) => (
            <FooterColumn key={index} title={column.title} links={column.links} />
          ))}
        </div>
      </div>
    </footer>
  );
} 