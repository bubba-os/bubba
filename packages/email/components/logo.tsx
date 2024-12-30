import { Img, Section } from "@react-email/components";

export function Logo() {
  return (
    <Section className="mt-[32px]">
      <Img
        src={"https://bubba.ai/logo.png"}
        width="45"
        height="45"
        alt="Bubba AI"
        className="my-0 mx-auto block"
      />
    </Section>
  );
}
