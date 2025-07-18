import React from "react";
import Link from "next/link";
import Container from "@/components/shared/section";

const aboutUsLinks = [
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/terms",
    label: "Terms of use",
  },
  {
    href: "/privacy",
    label: "Privacy Policy",
  },
];
// const loanLinks = [
//   {
//     href: "/",
//     label: "Instant loans",
//   },
//   {
//     href: "/",
//     label: "Payday loans",
//   },
//   {
//     href: "/",
//     label: "E-transfer loans",
//   },
//   {
//     href: "/",
//     label: "Bad credit loans",
//   },
//   {
//     href: "/",
//     label: "Government benefit loans",
//   },
// ];
const provinceLinks = [
  // {
  //   href: "/",
  //   label: "Nova Scotia",
  // },
  {
    href: "/",
    label: "Ontario",
  },
  // {
  //   href: "/",
  //   label: "Manitoba",
  // },
  {
    href: "/",
    label: "British Coloumbia",
  },
  {
    href: "/",
    label: "Alberta",
  },
];
const socialLinks = [
  {
    href: "https://x.com/dhanrhak",
    label: "X",
    target: "_blank", 
  },
  {
    href: "https://www.linkedin.com/company/35930667/admin/dashboard/",
    label: "LinkedIn",
    target: "_blank",
  },
  {
    href: "https://www.facebook.com/MeetQuoteShack",
    label: "Facebook",
    target: "_blank",
  },
];

const Section = ({ title, items }: { title: string; items: { href: string; label: string, target?: string }[] }) => (
  <div className="mb-4 md:mb-0">
    <p className="font-bold mb-2 text-xl">{title}</p>
    {items.map((item, i) => (
      <Link
        key={i}
        href={item.href}
        target={item.target}
        className="flex text-sm font-normal my-2 md:my-3 hover:underline underline-offset-4 transition duration-300 ease-in-out"
      >
        {item.label}
      </Link>
    ))}
  </div>
);

function Footer() {
  return (
    <div className="bg-violet-950 dark:bg-black text-white m-0 p-0">
        <Container>
        <div className="flex flex-col md:flex-row justify-between">
          <Section title="About us" items={aboutUsLinks} />
          {/* <Section title="Loans" items={loanLinks} /> */}
          <Section title="Provinces" items={provinceLinks} />
          <Section title="Social" items={socialLinks} />
        </div>
        </Container>
      <div className="bg-dark py-4">
        <p className="text-center text-sm font-normal text-gray-300">
          All rights reserved © {new Date().getFullYear()} <b>Quoteshack</b>
        </p>
      </div>
    </div>
  );
}

export default Footer;