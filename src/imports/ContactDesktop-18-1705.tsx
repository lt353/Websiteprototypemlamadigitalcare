import svgPaths from "./svg-wxozpziaox";
import imgImage1 from "figma:asset/30539b6d8cd964af5e7241f53bd9ca7398f7d609.png";

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
        Let’s Start a Conversation
      </p>
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[18px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>{`Whether you're seeking help for yourself or a loved one, we're here to listen and find the right path forward—at your pace, with patience.`}</p>
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
    <div className="bg-white relative shrink-0 w-full" data-name="Header / 64 /">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[80px] items-center px-[64px] py-[112px] relative w-full">
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
        Get in Touch
      </p>
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[18px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Share your story and let us help you gain digital confidence.
      </p>
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

function Mail() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="mail">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="mail">
          <path d={svgPaths.p1c438c00} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
        </g>
      </svg>
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name="Row">
      <Mail />
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-nowrap underline whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Email: hello@digitalkupuna.com
      </p>
    </div>
  );
}

function Call() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="call">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="call">
          <path d={svgPaths.p1c6bc180} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
        </g>
      </svg>
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name="Row">
      <Call />
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-nowrap underline whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Phone: +1 (808) 555-1234
      </p>
    </div>
  );
}

function LocationOn() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="location_on">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="location_on">
          <path d={svgPaths.pc28280} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
        </g>
      </svg>
    </div>
  );
}

function Row2() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name="Row">
      <LocationOn />
      <div className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="mb-0">
          {`Office Hours: `}
          <br aria-hidden="true" />
          Monday - Friday: 9am-5pm HST
        </p>
        <p className="mb-0">Saturday: 10am-2pm HST</p>
        <p>Sunday: Closed</p>
      </div>
    </div>
  );
}

function LocationOn1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="location_on">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="location_on">
          <path d={svgPaths.pc28280} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
        </g>
      </svg>
    </div>
  );
}

function Row3() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name="Row">
      <LocationOn1 />
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black w-[420px] whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        {`Service area: `}
        <br aria-hidden="true" />
        {`We are based on Oahu and serve customers across the island  through in-home sessions. Online sessions are available for  those on neighbor islands who are comfortable with video calls.`}
      </p>
    </div>
  );
}

function Content9() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[16px] items-start px-0 py-[8px] relative shrink-0" data-name="Content">
      <Row />
      <Row1 />
      <Row2 />
      <Row3 />
    </div>
  );
}

function Content10() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[32px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Content">
      <SectionTitle />
      <Content9 />
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black w-[420px] whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Prefer to Talk First?
        <br aria-hidden="true" />
        {`We completely understand many kūpuna prefer speaking  on the phone. Call us during business hours and we'll  discuss your needs, answer questions, and help you  decide if we're the right fit. `}
        <br aria-hidden="true" />
        No pressure, no sales pitch. Just a friendly conversation.
      </p>
      <div className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[0px] text-black w-[420px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.5] mb-0 text-[16px]">{`What Happens Next? `}</p>
        <ol className="list-decimal" start="1">
          <li className="mb-0 ms-[calc(1.5*1*var(--list-marker-font-size,0))]">
            <span className="leading-[1.5] text-[16px]">{`We'll call you within 24 hours (48 hours on weekends) `}</span>
          </li>
          <li className="mb-0 ms-[calc(1.5*1*var(--list-marker-font-size,0))]">
            <span className="leading-[1.5] text-[16px]">{`We'll discuss your specific needs and concerns `}</span>
          </li>
          <li className="leading-[1.5] mb-0 ms-[calc(1.5*1*var(--list-marker-font-size,0))]">
            <span className="text-[16px]">{`We'll schedule an initial in-person meeting to build trust `}</span>
            <span className="font-['Roboto:Light',_sans-serif] font-light text-[12px]" style={{ fontVariationSettings: "'wdth' 100" }}>{`(optional online virtual meeting with a loved one there if preferred) `}</span>
          </li>
          <li className="ms-[calc(1.5*1*var(--list-marker-font-size,0))]">
            <span className="leading-[1.5] text-[16px]">You decide how you would like to move forward.</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

function TextInput() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text input">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center p-[12px] w-full" />
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Input">
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        First name*
      </p>
      <TextInput />
    </div>
  );
}

function TextInput1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text input">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center p-[12px] w-full" />
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Input">
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Last name*
      </p>
      <TextInput1 />
    </div>
  );
}

function Inputs() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="Inputs">
      <Input />
      <Input1 />
    </div>
  );
}

function TextInput2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text input">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center p-[12px] w-full" />
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Input">
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Email*
      </p>
      <TextInput2 />
    </div>
  );
}

function TextInput3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text input">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center p-[12px] w-full" />
      </div>
    </div>
  );
}

function Input3() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Input">
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Phone number*
      </p>
      <TextInput3 />
    </div>
  );
}

function Inputs1() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="Inputs">
      <Input2 />
      <Input3 />
    </div>
  );
}

function Radio() {
  return (
    <div className="bg-white relative rounded-[100px] shrink-0 size-[18px]" data-name="Radio">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none rounded-[101px]" />
    </div>
  );
}

function Radio1() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Radio">
      <Radio />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-black text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.5] whitespace-pre">Looking for help for myself</p>
      </div>
    </div>
  );
}

function Row4() {
  return (
    <div className="content-stretch flex gap-[24px] h-[17px] items-start relative shrink-0 w-full" data-name="Row">
      <Radio1 />
    </div>
  );
}

function Radio2() {
  return (
    <div className="bg-white relative rounded-[100px] shrink-0 size-[18px]" data-name="Radio">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none rounded-[101px]" />
    </div>
  );
}

function Radio3() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Radio">
      <Radio2 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-black text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.5] whitespace-pre">Looking for help for a parent/loved one</p>
      </div>
    </div>
  );
}

function Row5() {
  return (
    <div className="content-stretch flex gap-[24px] h-[17px] items-start relative shrink-0 w-full" data-name="Row">
      <Radio3 />
    </div>
  );
}

function Radio4() {
  return (
    <div className="bg-white relative rounded-[100px] shrink-0 size-[18px]" data-name="Radio">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none rounded-[101px]" />
    </div>
  );
}

function Radio5() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Radio">
      <Radio4 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-black text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.5] whitespace-pre">Representing an organization/facility</p>
      </div>
    </div>
  );
}

function Row6() {
  return (
    <div className="content-stretch flex gap-[24px] h-[17px] items-start relative shrink-0 w-full" data-name="Row">
      <Radio5 />
    </div>
  );
}

function Radio6() {
  return (
    <div className="bg-white relative rounded-[100px] shrink-0 size-[18px]" data-name="Radio">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none rounded-[101px]" />
    </div>
  );
}

function Radio7() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Radio">
      <Radio6 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-black text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.5] whitespace-pre">Other</p>
      </div>
    </div>
  );
}

function Row7() {
  return (
    <div className="content-stretch flex gap-[24px] h-[17px] items-start relative shrink-0 w-full" data-name="Row">
      <Radio7 />
    </div>
  );
}

function Content11() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full" data-name="Content">
      <Row4 />
      <Row5 />
      <Row6 />
      <Row7 />
    </div>
  );
}

function Radios() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[16px] items-start px-0 py-[16px] relative shrink-0 w-full" data-name="Radios">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-black text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.5] whitespace-pre">I am:</p>
      </div>
      <Content11 />
    </div>
  );
}

function KeyboardArrowDown() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="keyboard_arrow_down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="keyboard_arrow_down">
          <path d={svgPaths.p34f3ac80} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
        </g>
      </svg>
    </div>
  );
}

function Select() {
  return (
    <div className="relative shrink-0 w-full" data-name="Select">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center p-[12px] relative w-full">
          <p className="basis-0 font-['Roboto:Regular',_sans-serif] font-normal grow leading-[1.5] min-h-px min-w-px relative shrink-0 text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
            Select one...
          </p>
          <KeyboardArrowDown />
        </div>
      </div>
    </div>
  );
}

function Input4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Input">
      <Radios />
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Which Island?
      </p>
      <Select />
    </div>
  );
}

function Checkbox() {
  return (
    <div className="bg-white relative shrink-0 size-[18px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
    </div>
  );
}

function Checkbox1() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex gap-[8px] items-center pb-[16px] pt-0 px-0 relative shrink-0" data-name="Checkbox">
      <Checkbox />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-black text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.5] whitespace-pre">{`Passwords & account management`}</p>
      </div>
    </div>
  );
}

function Checkbox2() {
  return (
    <div className="bg-white relative shrink-0 size-[18px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
    </div>
  );
}

function Checkbox3() {
  return (
    <div className="[grid-area:2_/_1] box-border content-stretch flex gap-[8px] items-center pb-[16px] pt-0 px-0 relative shrink-0" data-name="Checkbox">
      <Checkbox2 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-black text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.5] whitespace-pre">Identifying scams and staying safe</p>
      </div>
    </div>
  );
}

function Checkbox4() {
  return (
    <div className="bg-white relative shrink-0 size-[18px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
    </div>
  );
}

function Checkbox5() {
  return (
    <div className="[grid-area:1_/_2] box-border content-stretch flex gap-[8px] items-center pb-[16px] pt-0 px-0 relative shrink-0" data-name="Checkbox">
      <Checkbox4 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-black text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.5] whitespace-pre">Phone/tablet too cluttered or confusing</p>
      </div>
    </div>
  );
}

function Checkbox6() {
  return (
    <div className="bg-white relative shrink-0 size-[18px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
    </div>
  );
}

function Checkbox7() {
  return (
    <div className="[grid-area:2_/_2] box-border content-stretch flex gap-[8px] items-center pb-[16px] pt-0 px-0 relative shrink-0" data-name="Checkbox">
      <Checkbox6 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-black text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.5] whitespace-pre">Setting up health apps</p>
      </div>
    </div>
  );
}

function Checkbox8() {
  return (
    <div className="bg-white relative shrink-0 size-[18px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
    </div>
  );
}

function Checkbox9() {
  return (
    <div className="[grid-area:3_/_1] box-border content-stretch flex gap-[8px] items-center pb-[16px] pt-0 px-0 relative shrink-0" data-name="Checkbox">
      <Checkbox8 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-black text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.5] whitespace-pre">Video calls with family</p>
      </div>
    </div>
  );
}

function Checkbox10() {
  return (
    <div className="bg-white relative shrink-0 size-[18px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
    </div>
  );
}

function Checkbox11() {
  return (
    <div className="[grid-area:3_/_2] box-border content-stretch flex gap-[8px] items-center pb-[16px] pt-0 px-0 relative shrink-0" data-name="Checkbox">
      <Checkbox10 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-black text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.5] whitespace-pre">Not sure—need general guidance</p>
      </div>
    </div>
  );
}

function Column3() {
  return (
    <div className="gap-[32px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(3,_minmax(0px,_1fr))] h-[69px] relative shrink-0 w-full" data-name="Column">
      <Checkbox1 />
      <Checkbox3 />
      <Checkbox5 />
      <Checkbox7 />
      <Checkbox9 />
      <Checkbox11 />
    </div>
  );
}

function Content12() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[215px] items-start relative shrink-0 w-full" data-name="Content">
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        What are your main challenges? (select all that apply)
      </p>
      <Column3 />
    </div>
  );
}

function Input5() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[144px] items-start relative shrink-0 w-full" data-name="Input">
      <Content12 />
    </div>
  );
}

function KeyboardArrowDown1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="keyboard_arrow_down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="keyboard_arrow_down">
          <path d={svgPaths.p34f3ac80} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
        </g>
      </svg>
    </div>
  );
}

function Select1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Select">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center p-[12px] relative w-full">
          <p className="basis-0 font-['Roboto:Regular',_sans-serif] font-normal grow leading-[1.5] min-h-px min-w-px relative shrink-0 text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
            Select one...
          </p>
          <KeyboardArrowDown1 />
        </div>
      </div>
    </div>
  );
}

function Radios1() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[16px] items-start px-0 py-[16px] relative shrink-0 w-full" data-name="Radios">
      <Input5 />
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        How did you hear about us?
      </p>
      <Select1 />
    </div>
  );
}

function TextArea() {
  return (
    <div className="h-[180px] relative shrink-0 w-full" data-name="Text Area">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex h-[180px] items-start p-[12px] relative w-full">
          <p className="basis-0 font-['Roboto:Regular',_sans-serif] font-normal grow leading-[1.5] min-h-px min-w-px relative shrink-0 text-[16px] text-[rgba(0,0,0,0.6)]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Tell Us More (optional)
          </p>
          <div className="absolute bottom-[1.76px] flex h-[calc(1px*((var(--transform-inner-width)*0.7071067690849304)+(var(--transform-inner-height)*0.7071067690849304)))] items-center justify-center right-[2px] w-[calc(1px*((var(--transform-inner-height)*0.7071067690849304)+(var(--transform-inner-width)*0.7071067690849304)))]" style={{ "--transform-inner-width": "2.8125", "--transform-inner-height": "0" } as React.CSSProperties}>
            <div className="flex-none rotate-[135deg]">
              <div className="h-0 relative w-[2.828px]">
                <div className="absolute bottom-0 left-0 right-0 top-[-1px]" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 1">
                    <line id="Line 1" stroke="var(--stroke-0, black)" x2="2.82843" y1="0.5" y2="0.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-[2px] flex h-[calc(1px*((var(--transform-inner-width)*0.7071067690849304)+(var(--transform-inner-height)*0.7071067690849304)))] items-center justify-center right-[2px] w-[calc(1px*((var(--transform-inner-height)*0.7071067690849304)+(var(--transform-inner-width)*0.7071067690849304)))]" style={{ "--transform-inner-width": "8.46875", "--transform-inner-height": "0" } as React.CSSProperties}>
            <div className="flex-none rotate-[135deg]">
              <div className="h-0 relative w-[8.485px]">
                <div className="absolute bottom-0 left-0 right-0 top-[-1px]" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 1">
                    <line id="Line 2" stroke="var(--stroke-0, black)" x2="8.48528" y1="0.5" y2="0.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input6() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Input">
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Message
      </p>
      <TextArea />
    </div>
  );
}

function Checkbox12() {
  return (
    <div className="bg-white relative shrink-0 size-[18px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
    </div>
  );
}

function Checkbox13() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center pb-[16px] pt-0 px-0 relative shrink-0" data-name="Checkbox">
      <Checkbox12 />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-black text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.5] whitespace-pre">I accept the terms</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-black box-border content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[12px] relative shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Send Message
      </p>
    </div>
  );
}

function Form() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[7px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Form">
      <Inputs />
      <Inputs1 />
      <Input4 />
      <Radios1 />
      <Input6 />
      <Checkbox13 />
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] min-w-full relative shrink-0 text-[16px] text-black w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>{`🔒 Your privacy matters. We'll never share your information.`}</p>
      <Button2 />
    </div>
  );
}

function Component1() {
  return (
    <div className="content-stretch flex gap-[80px] items-start relative shrink-0 w-full" data-name="Component">
      <Content10 />
      <Form />
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

function Contact6() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Contact / 6 /">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[80px] items-center px-[64px] py-[112px] relative w-full">
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function SectionTitle1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center max-w-[768px] relative shrink-0 text-black text-center w-full" data-name="Section Title">
      <p className="font-['Roboto:Bold',_sans-serif] font-bold leading-[1.2] relative shrink-0 text-[48px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        FAQs
      </p>
      <p className="font-['Roboto:Regular',_sans-serif] font-normal leading-[1.5] relative shrink-0 text-[18px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Here are some common questions
      </p>
    </div>
  );
}

function KeyboardArrowUp() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="keyboard_arrow_up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="keyboard_arrow_up">
          <path d={svgPaths.p37e58b00} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
        </g>
      </svg>
    </div>
  );
}

function Question() {
  return (
    <div className="relative shrink-0 w-full" data-name="Question">
      <div className="box-border content-stretch flex gap-[24px] items-center overflow-clip px-0 py-[20px] relative rounded-[inherit] w-full">
        <p className="basis-0 font-['Roboto:Bold',_sans-serif] font-bold grow leading-[1.5] min-h-px min-w-px relative shrink-0 text-[18px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
          Q: How much does it cost?
        </p>
        <KeyboardArrowUp />
      </div>
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Answer() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-start pb-[24px] pt-0 px-0 relative shrink-0 w-full" data-name="Answer">
      <div className="basis-0 font-['Roboto:Regular',_sans-serif] font-normal grow leading-[0] min-h-px min-w-px relative shrink-0 text-[0px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.5] mb-0 text-[16px]">A: We offer flexible options to fit different needs and budgets:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[calc(1.5*1*var(--list-marker-font-size,0))]">
            <span className="leading-[1.5] text-[16px]">No-commitment options: Single sessions (in-person or virtual)</span>
          </li>
          <li className="mb-0 ms-[calc(1.5*1*var(--list-marker-font-size,0))]">
            <span className="leading-[1.5] text-[16px]">Monthly plans: Basic, Standard, and Premium tiers for ongoing support</span>
          </li>
          <li className="ms-[calc(1.5*1*var(--list-marker-font-size,0))]">
            <span className="leading-[1.5] text-[16px]">Group options: Affordable classes and community workshops</span>
          </li>
        </ul>
        <p className="leading-[1.5] text-[16px]">
          <span>{`Visit our `}</span>
          <a className="[text-decoration-skip-ink:none] [text-underline-position:from-font] cursor-pointer decoration-solid font-['Roboto:Regular',_sans-serif] font-normal underline" href="Page 1" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-[1.5]" href="Page 1" style={{ fontVariationSettings: "'wdth' 100" }}>
              Services page
            </span>
          </a>
          <span>{` for detailed pricing and to find the right fit for you.`}</span>
        </p>
      </div>
    </div>
  );
}

function Accordion() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Accordion">
      <Question />
      <Answer />
    </div>
  );
}

function KeyboardArrowUp1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="keyboard_arrow_up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="keyboard_arrow_up">
          <path d={svgPaths.p37e58b00} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
        </g>
      </svg>
    </div>
  );
}

function Question1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Question">
      <div className="box-border content-stretch flex gap-[24px] items-center overflow-clip px-0 py-[20px] relative rounded-[inherit] w-full">
        <p className="basis-0 font-['Roboto:Bold',_sans-serif] font-bold grow leading-[1.5] min-h-px min-w-px relative shrink-0 text-[18px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
          Q: Do you serve all Hawaiian islands?
        </p>
        <KeyboardArrowUp1 />
      </div>
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Answer1() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-start pb-[24px] pt-0 px-0 relative shrink-0 w-full" data-name="Answer">
      <div className="basis-0 font-['Roboto:Regular',_sans-serif] font-normal grow leading-[1.5] min-h-px min-w-px relative shrink-0 text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="mb-0">A: We are currently based on Oahu and offer in-home sessions throughout the island.</p>
        <p className="mb-0">For kūpuna on neighbor islands (Big Island, Maui, Kauai), we offer virtual sessions via video call.</p>
        <p>{`As we grow, we'd love to bring in-person services to your island. Let us know you're interested!`}</p>
      </div>
    </div>
  );
}

function Accordion1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Accordion">
      <Question1 />
      <Answer1 />
    </div>
  );
}

function KeyboardArrowUp2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="keyboard_arrow_up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="keyboard_arrow_up">
          <path d={svgPaths.p37e58b00} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
        </g>
      </svg>
    </div>
  );
}

function Question2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Question">
      <div className="box-border content-stretch flex gap-[24px] items-center overflow-clip px-0 py-[20px] relative rounded-[inherit] w-full">
        <p className="basis-0 font-['Roboto:Bold',_sans-serif] font-bold grow leading-[1.5] min-h-px min-w-px relative shrink-0 text-[18px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
          Q: Can I bring a friend or family member?
        </p>
        <KeyboardArrowUp2 />
      </div>
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Answer2() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-start pb-[24px] pt-0 px-0 relative shrink-0 w-full" data-name="Answer">
      <div className="basis-0 font-['Roboto:Regular',_sans-serif] font-normal grow leading-[0] min-h-px min-w-px relative shrink-0 text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.5] mb-0">A: Absolutely! Many kūpuna feel more comfortable having:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[24px]">
            <span className="leading-[1.5]">A family member present for support</span>
          </li>
          <li className="mb-0 ms-[24px]">
            <span className="leading-[1.5]">A friend joining to learn together (small group rates apply)</span>
          </li>
          <li className="ms-[24px]">
            <span className="leading-[1.5]">An adult child there to help coordinate</span>
          </li>
        </ul>
        <p className="leading-[1.5]">Learning together is encouraged!</p>
      </div>
    </div>
  );
}

function Accordion2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Accordion">
      <Question2 />
      <Answer2 />
    </div>
  );
}

function KeyboardArrowUp3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="keyboard_arrow_up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="keyboard_arrow_up">
          <path d={svgPaths.p37e58b00} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
        </g>
      </svg>
    </div>
  );
}

function Question3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Question">
      <div className="box-border content-stretch flex gap-[24px] items-center overflow-clip px-0 py-[20px] relative rounded-[inherit] w-full">
        <p className="basis-0 font-['Roboto:Bold',_sans-serif] font-bold grow leading-[1.5] min-h-px min-w-px relative shrink-0 text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
          Q: What devices do you support?
        </p>
        <KeyboardArrowUp3 />
      </div>
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Answer3() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-start pb-[24px] pt-0 px-0 relative shrink-0 w-full" data-name="Answer">
      <div className="basis-0 font-['Roboto:Regular',_sans-serif] font-normal grow leading-[1.5] min-h-px min-w-px relative shrink-0 text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="mb-0">A: We work with all devices: iPhones, Android phones, iPads, tablets, laptops (Mac or PC), and desktop computers.</p>
        <p className="mb-0">&nbsp;</p>
        <p>Our teaching focuses on skills and confidence that apply across all platforms.</p>
      </div>
    </div>
  );
}

function Accordion3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Accordion">
      <Question3 />
      <Answer3 />
    </div>
  );
}

function KeyboardArrowUp4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="keyboard_arrow_up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="keyboard_arrow_up">
          <path d={svgPaths.p37e58b00} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
        </g>
      </svg>
    </div>
  );
}

function Question4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Question">
      <div className="box-border content-stretch flex gap-[24px] items-center overflow-clip px-0 py-[20px] relative rounded-[inherit] w-full">
        <p className="basis-0 font-['Roboto:Bold',_sans-serif] font-bold grow leading-[1.5] min-h-px min-w-px relative shrink-0 text-[18px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
          Q: Why do you meet in-person first?
        </p>
        <KeyboardArrowUp4 />
      </div>
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Answer4() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-start pb-[24px] pt-0 px-0 relative shrink-0 w-full" data-name="Answer">
      <div className="basis-0 font-['Roboto:Regular',_sans-serif] font-normal grow leading-[1.5] min-h-px min-w-px relative shrink-0 text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="mb-0">{`A: Trust and safety are our top priorities. We know kūpuna are vulnerable to scams, and we never want to feel like "just another suspicious tech service."`}</p>
        <p className="mb-0">{`Meeting face-to-face first lets you see we're real people who care. You can meet us in a public place or your home with family present—whatever makes you most comfortable.`}</p>
        <p>After that, future sessions can be in-home, online, or a mix based on your preference.</p>
      </div>
    </div>
  );
}

function Accordion4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Accordion">
      <Question4 />
      <Answer4 />
    </div>
  );
}

function AccordionList() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="Accordion List">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-black border-solid inset-0 pointer-events-none" />
      <Accordion />
      <Accordion1 />
      <Accordion2 />
      <Accordion3 />
      <Accordion4 />
    </div>
  );
}

function KeyboardArrowUp5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="keyboard_arrow_up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="keyboard_arrow_up">
          <path d={svgPaths.p37e58b00} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
        </g>
      </svg>
    </div>
  );
}

function Question5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Question">
      <div className="box-border content-stretch flex gap-[24px] items-center overflow-clip px-0 py-[20px] relative rounded-[inherit] w-full">
        <p className="basis-0 font-['Roboto:Bold',_sans-serif] font-bold grow leading-[1.5] min-h-px min-w-px relative shrink-0 text-[18px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>{`Q: I'm not ready to commit to a monthly plan. What are my options?`}</p>
        <KeyboardArrowUp5 />
      </div>
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Answer5() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-start pb-[24px] pt-0 px-0 relative shrink-0 w-full" data-name="Answer">
      <div className="basis-0 font-['Roboto:Regular',_sans-serif] font-normal grow leading-[0] min-h-px min-w-px relative shrink-0 text-[0px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.5] mb-0 text-[16px]">A: We understand! You can start with:</p>
        <ul className="list-disc mb-0">
          <li className="mb-0 ms-[calc(1.5*1*var(--list-marker-font-size,0))]">
            <span className="leading-[1.5] text-[16px]">A single in-person or virtual session</span>
          </li>
          <li className="mb-0 ms-[calc(1.5*1*var(--list-marker-font-size,0))]">
            <span className="leading-[1.5] text-[16px]">A small group class with friends or family</span>
          </li>
          <li className="ms-[calc(1.5*1*var(--list-marker-font-size,0))]">
            <span className="leading-[1.5] text-[16px]">A free community workshop to learn about digital safety</span>
          </li>
        </ul>
        <p className="leading-[1.5] text-[16px]">
          <span>{`No pressure to commit until you're comfortable. Check our `}</span>
          <a className="[text-decoration-skip-ink:none] [text-underline-position:from-font] cursor-pointer decoration-solid font-['Roboto:Regular',_sans-serif] font-normal underline" href="Page 1" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-[1.5]" href="Page 1" style={{ fontVariationSettings: "'wdth' 100" }}>
              Services page
            </span>
          </a>
          <span>{` for options.`}</span>
        </p>
      </div>
    </div>
  );
}

function Accordion5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Accordion">
      <Question5 />
      <Answer5 />
    </div>
  );
}

function KeyboardArrowUp6() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="keyboard_arrow_up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="keyboard_arrow_up">
          <path d={svgPaths.p37e58b00} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
        </g>
      </svg>
    </div>
  );
}

function Question6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Question">
      <div className="box-border content-stretch flex gap-[24px] items-center overflow-clip px-0 py-[20px] relative rounded-[inherit] w-full">
        <p className="basis-0 font-['Roboto:Bold',_sans-serif] font-bold grow leading-[1.5] min-h-px min-w-px relative shrink-0 text-[18px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>{`Q: I'm not comfortable with technology at all. Is this for me?`}</p>
        <KeyboardArrowUp6 />
      </div>
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Answer6() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-start pb-[24px] pt-0 px-0 relative shrink-0 w-full" data-name="Answer">
      <div className="basis-0 font-['Roboto:Regular',_sans-serif] font-normal grow leading-[1.5] min-h-px min-w-px relative shrink-0 text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="mb-0">{`A: Yes—you're exactly who we help! We specialize in working with people who feel overwhelmed or anxious about technology.`}</p>
        <p className="mb-0">&nbsp;</p>
        <p>We start wherever you are, explain things in plain language (no jargon), and never make you feel rushed. Our approach is built on patience, not speed.</p>
      </div>
    </div>
  );
}

function Accordion6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Accordion">
      <Question6 />
      <Answer6 />
    </div>
  );
}

function KeyboardArrowUp7() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="keyboard_arrow_up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="keyboard_arrow_up">
          <path d={svgPaths.p37e58b00} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
        </g>
      </svg>
    </div>
  );
}

function Question7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Question">
      <div className="box-border content-stretch flex gap-[24px] items-center overflow-clip px-0 py-[20px] relative rounded-[inherit] w-full">
        <p className="basis-0 font-['Roboto:Bold',_sans-serif] font-bold grow leading-[1.5] min-h-px min-w-px relative shrink-0 text-[18px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
          Q: What exactly do you help with?
        </p>
        <KeyboardArrowUp7 />
      </div>
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Answer7() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-start pb-[24px] pt-0 px-0 relative shrink-0 w-full" data-name="Answer">
      <div className="basis-0 font-['Roboto:Regular',_sans-serif] font-normal grow leading-[0] min-h-px min-w-px relative shrink-0 text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.5] mb-0">A: We try to focus on three core areas where we’ve noticed kūpuna need the most support:</p>
        <ol className="list-decimal mb-0" start="1">
          <li className="mb-0 ms-[24px]">
            <span className="leading-[1.5]">{`Passwords & Account Management Setting up password managers, recovering accounts, organizing logins`}</span>
          </li>
          <li className="mb-0 ms-[24px]">
            <span className="leading-[1.5]">
              {`Scam Prevention & Response`}
              <br aria-hidden="true" />
              {` Identifying threats, reporting fraud, securing after a breach`}
            </span>
          </li>
          <li className="ms-[24px]">
            <span className="leading-[1.5]">{`Device Organization & Confidence Decluttering apps, adjusting settings, patient troubleshooting`}</span>
          </li>
        </ol>
        <p className="leading-[1.5]">We focus on education and empowerment, not device repairs or full IT support.</p>
      </div>
    </div>
  );
}

function Accordion7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Accordion">
      <Question7 />
      <Answer7 />
    </div>
  );
}

function KeyboardArrowUp8() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="keyboard_arrow_up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="keyboard_arrow_up">
          <path d={svgPaths.p37e58b00} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
        </g>
      </svg>
    </div>
  );
}

function Question8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Question">
      <div className="box-border content-stretch flex gap-[24px] items-center overflow-clip px-0 py-[20px] relative rounded-[inherit] w-full">
        <p className="basis-0 font-['Roboto:Bold',_sans-serif] font-bold grow leading-[1.5] min-h-px min-w-px relative shrink-0 text-[18px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
          Q: Can my daughter/son arrange this for me?
        </p>
        <KeyboardArrowUp8 />
      </div>
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Answer8() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-start pb-[24px] pt-0 px-0 relative shrink-0 w-full" data-name="Answer">
      <div className="basis-0 font-['Roboto:Regular',_sans-serif] font-normal grow leading-[1.5] min-h-px min-w-px relative shrink-0 text-[0px] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="mb-0">A: Absolutely! Many adult children arrange and pay for tech support for their parents.</p>
        <p className="mb-0">
          <span>{`We just ask that `}</span>
          <span className="font-['Roboto:Bold',_sans-serif] font-bold" style={{ fontVariationSettings: "'wdth' 100" }}>
            you
          </span>
          <span>{` (the senior) are comfortable with learning. Our goal is to help you become more independent with technology, not create dependency.`}</span>
        </p>
        <p className="mb-0">&nbsp;</p>
        <p>Adult children are welcome to join sessions, and many purchase monthly plans as gifts for their parents.</p>
      </div>
    </div>
  );
}

function Accordion8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Accordion">
      <Question8 />
      <Answer8 />
    </div>
  );
}

function AccordionList1() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="Accordion List">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-black border-solid inset-0 pointer-events-none" />
      <Accordion5 />
      <Accordion6 />
      <Accordion7 />
      <Accordion8 />
    </div>
  );
}

function Content13() {
  return (
    <div className="content-stretch flex gap-[64px] items-start relative shrink-0 w-full" data-name="Content">
      <AccordionList />
      <AccordionList1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-center max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <SectionTitle1 />
      <Content13 />
    </div>
  );
}

function Faq10() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[80px] h-[1373px] items-center overflow-clip px-[64px] py-[112px] relative shrink-0 w-[1440px]" data-name="FAQ / 10 /">
      <Container3 />
    </div>
  );
}

function Content14() {
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
      <Content14 />
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

function Actions1() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name="Actions">
      <Button3 />
      <Button4 />
    </div>
  );
}

function Content15() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[32px] grow h-[362px] items-start max-w-[560px] min-h-px min-w-px relative shrink-0" data-name="Content">
      <ContentTop />
      <Actions1 />
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

function Column4() {
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
      <LinkedIn />
      <Youtube />
    </div>
  );
}

function Links() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-full items-end justify-between max-w-[400px] min-h-px min-w-px relative shrink-0" data-name="Links">
      <Column4 />
      <SocialLinks />
    </div>
  );
}

function Content16() {
  return (
    <div className="content-stretch flex h-[334px] items-start justify-between relative shrink-0 w-full" data-name="Content">
      <Content15 />
      <Links />
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white h-[414px] relative shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] h-[414px] items-start p-[48px] relative w-full">
          <Content16 />
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

function Row8() {
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
      <Row8 />
    </div>
  );
}

function Component2() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] h-[403px] items-start relative shrink-0 w-full" data-name="Component">
      <Card />
      <Credits />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-start max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Component2 />
    </div>
  );
}

function Footer13() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[32px] h-[563px] items-center overflow-clip px-[64px] py-[80px] relative shrink-0 w-[1440px]" data-name="Footer / 13 /">
      <Container4 />
    </div>
  );
}

export default function ContactDesktop() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Contact • Desktop">
      <Navbar12Navbar12Navbar12Navbar12Desktop />
      <Header64 />
      <Contact6 />
      <Faq10 />
      <Footer13 />
    </div>
  );
}