import svgPaths from "./svg-zykekmspr3";
import imgImage1 from "figma:asset/30539b6d8cd964af5e7241f53bd9ca7398f7d609.png";
import imgPlaceholderImage from "figma:asset/d568b164c26b35eebe6a407c03f478bc8049c84b.png";
import imgPlaceholderImage1 from "figma:asset/f1c58a61b65699e530e9d20c512746d3b992b4f5.png";

function Column() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Column">
      <div className="h-[61px] relative shrink-0 w-[123px]" data-name="image 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
    </div>
  );
}

function LinkOne() {
  return (
    <div className="content-stretch flex gap-[10px] items-start relative shrink-0" data-name="Link One">
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Home
      </p>
    </div>
  );
}

function LinkOne1() {
  return (
    <div className="content-stretch flex gap-[10px] items-start relative shrink-0" data-name="Link One">
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Services
      </p>
    </div>
  );
}

function LinkTwo() {
  return (
    <div className="content-stretch flex gap-[10px] items-start relative shrink-0" data-name="Link Two">
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        About Us
      </p>
    </div>
  );
}

function LinkThree() {
  return (
    <div className="content-stretch flex gap-[10px] items-start relative shrink-0" data-name="Link Three">
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Contact
      </p>
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Chevron Down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Chevron Down">
          <path clipRule="evenodd" d={svgPaths.pee47f00} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function NavLinkDropdown() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Nav Link Dropdown">
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        More
      </p>
      <ChevronDown />
    </div>
  );
}

function Relume() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Relume">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Relume">
          <path clipRule="evenodd" d={svgPaths.p119cd700} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Content() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start leading-[1.5] min-h-px min-w-px relative shrink-0 text-black" data-name="Content">
      <p className="font-['Roboto:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Page One
      </p>
      <p className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0 text-[14px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Lorem ipsum dolor sit amet consectetur elit
      </p>
    </div>
  );
}

function MenuItem() {
  return (
    <div className="box-border content-stretch flex gap-[12px] h-[74px] items-start px-0 py-[4px] relative shrink-0 w-full" data-name="Menu Item">
      <Relume />
      <Content />
    </div>
  );
}

function Relume1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Relume">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Relume">
          <path clipRule="evenodd" d={svgPaths.p119cd700} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Content1() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start leading-[1.5] min-h-px min-w-px relative shrink-0 text-black" data-name="Content">
      <p className="font-['Roboto:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Page Two
      </p>
      <p className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0 text-[14px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Lorem ipsum dolor sit amet consectetur elit
      </p>
    </div>
  );
}

function MenuItem1() {
  return (
    <div className="box-border content-stretch flex gap-[12px] h-[74px] items-start px-0 py-[4px] relative shrink-0 w-full" data-name="Menu Item">
      <Relume1 />
      <Content1 />
    </div>
  );
}

function Relume2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Relume">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Relume">
          <path clipRule="evenodd" d={svgPaths.p119cd700} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Content2() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start leading-[1.5] min-h-px min-w-px relative shrink-0 text-black" data-name="Content">
      <p className="font-['Roboto:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Page Three
      </p>
      <p className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0 text-[14px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Lorem ipsum dolor sit amet consectetur elit
      </p>
    </div>
  );
}

function MenuItem2() {
  return (
    <div className="box-border content-stretch flex gap-[12px] h-[74px] items-start px-0 py-[4px] relative shrink-0 w-full" data-name="Menu Item">
      <Relume2 />
      <Content2 />
    </div>
  );
}

function Relume3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Relume">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Relume">
          <path clipRule="evenodd" d={svgPaths.p119cd700} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Content3() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start leading-[1.5] min-h-px min-w-px relative shrink-0 text-black" data-name="Content">
      <p className="font-['Roboto:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Page Four
      </p>
      <p className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0 text-[14px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Lorem ipsum dolor sit amet consectetur elit
      </p>
    </div>
  );
}

function MenuItem3() {
  return (
    <div className="box-border content-stretch flex gap-[12px] h-[74px] items-start px-0 py-[4px] relative shrink-0 w-full" data-name="Menu Item">
      <Relume3 />
      <Content3 />
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="List">
      <MenuItem />
      <MenuItem1 />
      <MenuItem2 />
      <MenuItem3 />
    </div>
  );
}

function MenuList() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Menu List">
      <p className="font-['Roboto:SemiBold',_sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[14px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Page Group One
      </p>
      <List />
    </div>
  );
}

function Relume4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Relume">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Relume">
          <path clipRule="evenodd" d={svgPaths.p119cd700} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Content4() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start leading-[1.5] min-h-px min-w-px relative shrink-0 text-black" data-name="Content">
      <p className="font-['Roboto:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Page Five
      </p>
      <p className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0 text-[14px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Lorem ipsum dolor sit amet consectetur elit
      </p>
    </div>
  );
}

function MenuItem4() {
  return (
    <div className="box-border content-stretch flex gap-[12px] h-[74px] items-start px-0 py-[4px] relative shrink-0 w-full" data-name="Menu Item">
      <Relume4 />
      <Content4 />
    </div>
  );
}

function Relume5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Relume">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Relume">
          <path clipRule="evenodd" d={svgPaths.p119cd700} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Content5() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start leading-[1.5] min-h-px min-w-px relative shrink-0 text-black" data-name="Content">
      <p className="font-['Roboto:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Page Six
      </p>
      <p className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0 text-[14px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Lorem ipsum dolor sit amet consectetur elit
      </p>
    </div>
  );
}

function MenuItem5() {
  return (
    <div className="box-border content-stretch flex gap-[12px] h-[74px] items-start px-0 py-[4px] relative shrink-0 w-full" data-name="Menu Item">
      <Relume5 />
      <Content5 />
    </div>
  );
}

function Relume6() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Relume">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Relume">
          <path clipRule="evenodd" d={svgPaths.p119cd700} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Content6() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start leading-[1.5] min-h-px min-w-px relative shrink-0 text-black" data-name="Content">
      <p className="font-['Roboto:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Page Seven
      </p>
      <p className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0 text-[14px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Lorem ipsum dolor sit amet consectetur elit
      </p>
    </div>
  );
}

function MenuItem6() {
  return (
    <div className="box-border content-stretch flex gap-[12px] h-[74px] items-start px-0 py-[4px] relative shrink-0 w-full" data-name="Menu Item">
      <Relume6 />
      <Content6 />
    </div>
  );
}

function Relume7() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Relume">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Relume">
          <path clipRule="evenodd" d={svgPaths.p119cd700} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Content7() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start leading-[1.5] min-h-px min-w-px relative shrink-0 text-black" data-name="Content">
      <p className="font-['Roboto:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Page Eight
      </p>
      <p className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0 text-[14px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Lorem ipsum dolor sit amet consectetur elit
      </p>
    </div>
  );
}

function MenuItem7() {
  return (
    <div className="box-border content-stretch flex gap-[12px] h-[74px] items-start px-0 py-[4px] relative shrink-0 w-full" data-name="Menu Item">
      <Relume7 />
      <Content7 />
    </div>
  );
}

function List1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="List">
      <MenuItem4 />
      <MenuItem5 />
      <MenuItem6 />
      <MenuItem7 />
    </div>
  );
}

function MenuList1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Menu List">
      <p className="font-['Roboto:SemiBold',_sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[14px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Page Group 2
      </p>
      <List1 />
    </div>
  );
}

function Menu() {
  return (
    <div className="absolute bg-white left-[-430px] top-[32px] w-[640px]" data-name="Menu">
      <div className="box-border content-stretch flex gap-[32px] items-start overflow-clip p-[24px] relative rounded-[inherit] w-[640px]">
        <MenuList />
        <MenuList1 />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function LinkFour() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0" data-name="Link Four">
      <NavLinkDropdown />
      <Menu />
    </div>
  );
}

function Column1() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0" data-name="Column">
      <LinkOne />
      <LinkOne1 />
      <LinkTwo />
      <LinkThree />
      <LinkFour />
    </div>
  );
}

function Button() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[20px] py-[8px] relative shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Login
      </p>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-black box-border content-stretch flex gap-[8px] items-center justify-center px-[20px] py-[8px] relative shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Register
      </p>
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Actions">
      <Button />
      <Button1 />
    </div>
  );
}

function Column2() {
  return (
    <div className="content-stretch flex gap-[16px] items-center justify-center relative shrink-0" data-name="Column">
      <Column1 />
      <Actions />
    </div>
  );
}

function Container() {
  return (
    <div className="basis-0 content-stretch flex grow items-center justify-between min-h-px min-w-px relative shrink-0" data-name="Container">
      <Column />
      <Column2 />
    </div>
  );
}

function Header() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[72px] items-center justify-between px-[64px] py-0 relative w-full">
          <Container />
        </div>
      </div>
    </div>
  );
}

function Navbar12Navbar12Navbar12Navbar12Desktop() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[504px] items-center relative shrink-0 w-[1440px]" data-name="Navbar / 12 //Navbar/12/Navbar/12/Navbar/12/Desktop">
      <Header />
    </div>
  );
}

function Component() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center max-w-[768px] relative shrink-0 text-black text-center w-full" data-name="Component">
      <p className="font-['Roboto:Bold',_sans-serif] font-bold leading-[1.2] relative shrink-0 text-[56px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        About Mālama Digital Care
      </p>
      <p className="font-['Roboto:Medium',_sans-serif] font-medium leading-[1.5] relative shrink-0 text-[20px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Built by Hawaii residents who understand our kūpuna
      </p>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-center max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Component />
    </div>
  );
}

function Header64() {
  return (
    <div className="bg-white h-[233px] relative shrink-0 w-full" data-name="Header / 64 /">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[80px] h-[233px] items-center px-[64px] py-[112px] relative w-full">
          <Container1 />
        </div>
      </div>
    </div>
  );
}

function Content8() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 text-black w-full" data-name="Content">
      <p className="font-['Roboto:Bold',_sans-serif] font-bold leading-[1.2] relative shrink-0 text-[48px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        How The Journey Started
      </p>
      <div className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[18px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.5] mb-0 whitespace-pre-wrap">{`Mālama Digital Care began with a simple observation:  our kūpuna were struggling with technology—not because  they couldn't learn, but because they weren't getting  the right kind of help. `}</p>
        <p className="leading-[1.5] mb-0">&nbsp;</p>
        <p className="leading-[1.5] mb-0">{`We watched our own family members and friends: `}</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[1.5]">{`Get locked out of email repeatedly `}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[1.5]">{`Fall for sophisticated scams despite warnings `}</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[1.5]">{`Feel embarrassed asking the same questions `}</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[1.5]">{`Grow frustrated with impatient helpers `}</span>
          </li>
        </ul>
        <p className="leading-[1.5] mb-0">&nbsp;</p>
        <p className="leading-[1.5] mb-0 whitespace-pre-wrap">{`Before we launched, we reached out and talked with seniors and  caregivers across the islands. Their feedback changed everything. `}</p>
        <p className="leading-[1.5] mb-0">&nbsp;</p>
        <p className="leading-[1.5] mb-0 whitespace-pre-wrap">{`What we learned: Seniors don't want quick fixes— they want to understand. They want to feel capable,  not dependent. They value relationships over transactions. `}</p>
        <p className="leading-[1.5] mb-0">&nbsp;</p>
        <p className="leading-[1.5] whitespace-pre-wrap">{`That insight shaped our entire approach: patient teaching,  ongoing support, and building real confidence that lasts.`}</p>
      </div>
    </div>
  );
}

function SectionTitle() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Section Title">
      <Content8 />
    </div>
  );
}

function ContentLeft() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[32px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Content Left">
      <SectionTitle />
    </div>
  );
}

function Component1() {
  return (
    <div className="content-stretch flex gap-[80px] h-[640px] items-center relative shrink-0 w-full" data-name="Component">
      <ContentLeft />
      <div className="aspect-[600/640] basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Placeholder Image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgPlaceholderImage} />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-start max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Component1 />
    </div>
  );
}

function Layout1() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[80px] h-[791px] items-center overflow-clip px-[64px] py-[112px] relative shrink-0 w-[1440px]" data-name="Layout / 1 /">
      <Container2 />
    </div>
  );
}

function TaglineWrapper1() {
  return <div className="h-[24px] shrink-0 w-0" data-name="Tagline Wrapper" />;
}

function Content9() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 text-black text-center w-full" data-name="Content">
      <p className="font-['Roboto:Bold',_sans-serif] font-bold leading-[1.2] relative shrink-0 text-[48px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>{`Our Mission & Values`}</p>
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[18px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        We believe in patient, continuous learning that builds true digital confidence. Our method goes beyond quick fixes.
      </p>
    </div>
  );
}

function HourglassTop() {
  return (
    <div className="h-[34px] relative shrink-0 w-[37px]" data-name="hourglass_top">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37 34">
        <g id="hourglass_top">
          <path d={svgPaths.p158f9ba0} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Content10() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0 text-black" data-name="Content">
      <p className="font-['Roboto:Bold',_sans-serif] font-bold leading-[1.4] relative shrink-0 text-[24px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Patience
      </p>
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>{`We move at your speed. Ask the same question  five times? That's fine. We'll answer it six.  No judgment, no rushing, ever.`}</p>
    </div>
  );
}

function Column3() {
  return (
    <div className="basis-0 content-stretch flex gap-[24px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Column">
      <HourglassTop />
      <Content10 />
    </div>
  );
}

function PottedPlant() {
  return (
    <div className="h-[34px] relative shrink-0 w-[37px]" data-name="potted_plant">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37 34">
        <g id="potted_plant">
          <path d={svgPaths.p1f40880} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Content11() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0 text-black" data-name="Content">
      <p className="font-['Roboto:Bold',_sans-serif] font-bold leading-[1.4] relative shrink-0 text-[24px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Empowerment
      </p>
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>{`We teach you how to solve problems yourself.  Our goal is your independence, not your  dependence on us.`}</p>
    </div>
  );
}

function Column4() {
  return (
    <div className="basis-0 content-stretch flex gap-[24px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Column">
      <PottedPlant />
      <Content11 />
    </div>
  );
}

function Handshake() {
  return (
    <div className="h-[34px] relative shrink-0 w-[30px]" data-name="handshake">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 34">
        <g id="handshake">
          <path d={svgPaths.pc803000} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Content12() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0 text-black" data-name="Content">
      <p className="font-['Roboto:Bold',_sans-serif] font-bold h-[34px] leading-[1.4] relative shrink-0 text-[24px] w-[169px]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Trust & Safety`}</p>
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] min-w-full relative shrink-0 text-[16px] w-[min-content] whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>{`Your safety is our top priority. We'll never  rush you, judge you, or make you feel inadequate.  You're in good hands.`}</p>
    </div>
  );
}

function Column5() {
  return (
    <div className="basis-0 content-stretch flex gap-[24px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Column">
      <Handshake />
      <Content12 />
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex gap-[32px] items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Column3 />
      <Column4 />
      <Column5 />
    </div>
  );
}

function SectionTitle1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full" data-name="Section Title">
      <TaglineWrapper1 />
      <Content9 />
      <Row />
    </div>
  );
}

function Content13() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-center max-w-[768px] relative shrink-0 w-full" data-name="Content">
      <SectionTitle1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] h-[386px] items-center max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Content13 />
    </div>
  );
}

function Layout504() {
  return (
    <div className="bg-white h-[578px] relative shrink-0 w-full" data-name="Layout / 504 /">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[80px] h-[578px] items-center px-[64px] py-[112px] relative w-full">
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function Content14() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full" data-name="Content">
      <p className="font-['Roboto:Bold',_sans-serif] font-bold leading-[1.2] relative shrink-0 text-[48px] text-black text-center w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Meet The Team
      </p>
    </div>
  );
}

function SectionTitle2() {
  return (
    <div className="content-stretch flex flex-col gap-[66px] items-center max-w-[768px] relative shrink-0 w-full" data-name="Section Title">
      <Content14 />
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex flex-col items-center leading-[1.5] relative shrink-0 w-full" data-name="Title">
      <p className="font-['Roboto:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[20px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Tea Araki
      </p>
      <p className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0 text-[18px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Founder
      </p>
    </div>
  );
}

function Content15() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 text-black text-center w-full" data-name="Content">
      <Title />
      <div className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[0px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="mb-0 text-[14px]">Our Original IT Wizard</p>
        <p className="mb-0 text-[14px]">Former: Tech Coordinator at Kahakai Elementary School</p>
        <p className="font-['Roboto:Light_Italic',_sans-serif] font-light italic text-[12px] whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>{`"I people with technology every day.  I know how to explain tech without jargon and without making anyone feel rushed or inadequate."`}</p>
      </div>
    </div>
  );
}

function LinkedIn() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="LinkedIn">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="LinkedIn">
          <path clipRule="evenodd" d={svgPaths.p2b170900} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SocialIcons() {
  return (
    <div className="content-stretch flex gap-[14px] items-start relative shrink-0" data-name="Social Icons">
      <LinkedIn />
    </div>
  );
}

function Card() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[24px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Card">
      <div className="relative shrink-0 size-[80px]" data-name="Placeholder Image">
        <img alt="" className="block max-w-none size-full" height="80" src={imgPlaceholderImage1} width="80" />
      </div>
      <Content15 />
      <SocialIcons />
    </div>
  );
}

function Title1() {
  return (
    <div className="content-stretch flex flex-col items-center leading-[1.5] relative shrink-0 w-full" data-name="Title">
      <p className="font-['Roboto:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[20px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Lindsay Trenton
      </p>
      <p className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0 text-[18px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Founder
      </p>
    </div>
  );
}

function Content16() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 text-black text-center w-full" data-name="Content">
      <Title1 />
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[0px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <span className="text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Our Training Guru
          <br aria-hidden="true" />
          Former: GM for a large hostel group in Hungary
          <br aria-hidden="true" />
        </span>
        <span className="font-['Roboto:Light_Italic',_sans-serif] font-light italic text-[12px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          ”Working with a diverse team taught me how to take my time and teach every member in the way that works best for them”
        </span>
      </p>
    </div>
  );
}

function LinkedIn1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="LinkedIn">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="LinkedIn">
          <path clipRule="evenodd" d={svgPaths.p2b170900} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SocialIcons1() {
  return (
    <div className="content-stretch flex gap-[14px] items-start relative shrink-0" data-name="Social Icons">
      <LinkedIn1 />
    </div>
  );
}

function Card1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[24px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Card">
      <div className="relative shrink-0 size-[80px]" data-name="Placeholder Image">
        <img alt="" className="block max-w-none size-full" height="80" src={imgPlaceholderImage1} width="80" />
      </div>
      <Content16 />
      <SocialIcons1 />
    </div>
  );
}

function Title2() {
  return (
    <div className="content-stretch flex flex-col items-center leading-[1.5] relative shrink-0 w-full" data-name="Title">
      <p className="font-['Roboto:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[20px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        DJ Sable
      </p>
      <p className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0 text-[18px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Founder
      </p>
    </div>
  );
}

function Content17() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 text-black text-center w-full" data-name="Content">
      <Title2 />
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[0px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <span className="text-[14px]">
          Our Business Tycoon
          <br aria-hidden="true" />
          Former: Entrepreneur and Investor
          <br aria-hidden="true" />
        </span>
        <span className="font-['Roboto:Light_Italic',_sans-serif] font-light italic text-[12px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          ”Running a business means understanding what customers really need, not just what think they need. I listen first, then solve.”
        </span>
      </p>
    </div>
  );
}

function LinkedIn2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="LinkedIn">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="LinkedIn">
          <path clipRule="evenodd" d={svgPaths.p2b170900} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SocialIcons2() {
  return (
    <div className="content-stretch flex gap-[14px] items-start relative shrink-0" data-name="Social Icons">
      <LinkedIn2 />
    </div>
  );
}

function Card2() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[24px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Card">
      <div className="relative shrink-0 size-[80px]" data-name="Placeholder Image">
        <img alt="" className="block max-w-none size-full" height="80" src={imgPlaceholderImage1} width="80" />
      </div>
      <Content17 />
      <SocialIcons2 />
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex gap-[48px] items-start relative shrink-0 w-full" data-name="Row">
      <Card />
      <Card1 />
      <Card2 />
    </div>
  );
}

function Content18() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] h-[383px] items-start relative shrink-0 w-full" data-name="Content">
      <Row1 />
    </div>
  );
}

function Content19() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 text-black text-center w-full" data-name="Content">
      <p className="font-['Roboto:Bold',_sans-serif] font-bold leading-[1.2] relative shrink-0 text-[40px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Growing our ‘Ohana
      </p>
      <div className="font-['Roboto:Medium',_sans-serif] font-medium leading-[1.5] relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="mb-0">{`We're building a team of patient, tech-savvy guides who share our passion for helping kūpuna thrive in the digital world. `}</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">{`We're looking for people who understand that teaching technology isn't about speed, it's about building trust and confidence.`}</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">{`Whether you're a tech professional looking for more meaningful work, a recent graduate passionate about serving your community, or someone who simply has the patience and heart to help kūpuna feel empowered, we'd love to hear from you.`}</p>
        <p className="mb-0">&nbsp;</p>
        <p>{`We are currently based on Oahu, so we are primarily looking to expand our team here. That siad, as we expand across Hawaii's islands, we will be looking to expand our team on the outer islands as well. `}</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[12px] relative shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        View positions
      </p>
    </div>
  );
}

function Actions1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[155px]" data-name="Actions">
      <Button2 />
    </div>
  );
}

function Content20() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[429px] items-center relative shrink-0 w-[966px]" data-name="Content">
      <Content19 />
      <Actions1 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] h-[983px] items-center max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <SectionTitle2 />
      <Content18 />
      <Content20 />
    </div>
  );
}

function Team5() {
  return (
    <div className="bg-white h-[1006px] relative shrink-0 w-full" data-name="Team / 5 /">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[80px] h-[1006px] items-center px-[64px] py-[112px] relative w-full">
          <Container4 />
        </div>
      </div>
    </div>
  );
}

function Content21() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 text-black w-full" data-name="Content">
      <p className="font-['Roboto:Bold',_sans-serif] font-bold leading-[1.2] relative shrink-0 text-[56px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>{`Let's connect and grow together`}</p>
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Technology support for kūpuna, designed with patience and understanding
      </p>
    </div>
  );
}

function ContentTop() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Content Top">
      <div className="h-[61px] relative shrink-0 w-[123px]" data-name="image 2">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
      <Content21 />
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-black box-border content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[12px] relative shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Get started
      </p>
    </div>
  );
}

function Button4() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[12px] relative shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Learn more
      </p>
    </div>
  );
}

function Actions2() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name="Actions">
      <Button3 />
      <Button4 />
    </div>
  );
}

function Content22() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[32px] grow items-start max-w-[560px] min-h-px min-w-px relative shrink-0" data-name="Content">
      <ContentTop />
      <Actions2 />
    </div>
  );
}

function Link() {
  return (
    <div className="box-border content-stretch flex items-start px-0 py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="basis-0 font-['Roboto:SemiBold',_sans-serif] font-semibold grow leading-[1.5] min-h-px min-w-px relative shrink-0 text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        Services
      </p>
    </div>
  );
}

function Link1() {
  return (
    <div className="box-border content-stretch flex items-start px-0 py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="basis-0 font-['Roboto:SemiBold',_sans-serif] font-semibold grow leading-[1.5] min-h-px min-w-px relative shrink-0 text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        About us
      </p>
    </div>
  );
}

function Link2() {
  return (
    <div className="box-border content-stretch flex items-start px-0 py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="basis-0 font-['Roboto:SemiBold',_sans-serif] font-semibold grow leading-[1.5] min-h-px min-w-px relative shrink-0 text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        Contact
      </p>
    </div>
  );
}

function LinkList() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="Link List">
      <Link />
      <Link1 />
      <Link2 />
    </div>
  );
}

function Link3() {
  return (
    <div className="box-border content-stretch flex items-start px-0 py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="basis-0 font-['Roboto:SemiBold',_sans-serif] font-semibold grow leading-[1.5] min-h-px min-w-px relative shrink-0 text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        Workshops
      </p>
    </div>
  );
}

function Link4() {
  return (
    <div className="box-border content-stretch flex items-start px-0 py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="basis-0 font-['Roboto:SemiBold',_sans-serif] font-semibold grow leading-[1.5] min-h-px min-w-px relative shrink-0 text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        Partners
      </p>
    </div>
  );
}

function Link5() {
  return (
    <div className="box-border content-stretch flex items-start px-0 py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="basis-0 font-['Roboto:SemiBold',_sans-serif] font-semibold grow leading-[1.5] min-h-px min-w-px relative shrink-0 text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        Pricing
      </p>
    </div>
  );
}

function Link6() {
  return <div className="h-[37px] shrink-0 w-full" data-name="Link" />;
}

function LinkList1() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="Link List">
      <Link3 />
      <Link4 />
      <Link5 />
      {[...Array(2).keys()].map((_, i) => (
        <Link6 key={i} />
      ))}
    </div>
  );
}

function Column6() {
  return (
    <div className="content-stretch flex gap-[32px] items-start overflow-clip relative shrink-0 w-full" data-name="Column">
      <LinkList />
      <LinkList1 />
    </div>
  );
}

function Facebook() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Facebook">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Facebook">
          <path d={svgPaths.p2ed8fe00} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Instagram() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Instagram">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Instagram">
          <path clipRule="evenodd" d={svgPaths.p3f3f55f0} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function X() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="X">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="X">
          <path d={svgPaths.p214d7500} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function LinkedIn3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="LinkedIn">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="LinkedIn">
          <path clipRule="evenodd" d={svgPaths.p2b170900} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Youtube() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Youtube">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Youtube">
          <path d={svgPaths.p35f23f00} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Social Links">
      <Facebook />
      <Instagram />
      <X />
      <LinkedIn3 />
      <Youtube />
    </div>
  );
}

function Links() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-full items-end justify-between max-w-[400px] min-h-px min-w-px relative shrink-0" data-name="Links">
      <Column6 />
      <SocialLinks />
    </div>
  );
}

function Content23() {
  return (
    <div className="content-stretch flex h-[334px] items-start justify-between relative shrink-0 w-full" data-name="Content">
      <Content22 />
      <Links />
    </div>
  );
}

function Card3() {
  return (
    <div className="bg-white h-[414px] relative shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] h-[414px] items-start p-[48px] relative w-full">
          <Content23 />
        </div>
      </div>
    </div>
  );
}

function FooterLinks() {
  return (
    <div className="content-stretch flex font-['Roboto:Regular',_sans-serif] font-normal gap-[24px] items-start leading-[1.5] relative shrink-0 text-[14px] text-black text-nowrap underline whitespace-pre" data-name="Footer Links">
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        Privacy policy
      </p>
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        Terms of service
      </p>
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        Cookies settings
      </p>
    </div>
  );
}

function Row2() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Row">
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        © 2025 Kūpuna Digital Care. All rights reserved.
      </p>
      <FooterLinks />
    </div>
  );
}

function Credits() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Credits">
      <Row2 />
    </div>
  );
}

function Component2() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] h-[403px] items-start relative shrink-0 w-full" data-name="Component">
      <Card3 />
      <Credits />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-start max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Component2 />
    </div>
  );
}

function Footer13() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[32px] h-[570px] items-center overflow-clip px-[64px] py-[80px] relative shrink-0 w-[1440px]" data-name="Footer / 13 /">
      <Container5 />
    </div>
  );
}

export default function AboutUsDesktop() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="About Us • Desktop">
      <Navbar12Navbar12Navbar12Navbar12Desktop />
      <Header64 />
      <Layout1 />
      <Layout504 />
      <Team5 />
      <Footer13 />
    </div>
  );
}