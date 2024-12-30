import { Img, Section } from "@react-email/components";

export function Logo() {
  return (
    <Section className="mt-[32px]">
      <Img
        src={"https://app.bubba.ai/favicon-32x32.png"}
        width="45"
        height="45"
        alt="Bubba AI"
        className="my-0 mx-auto block"
      />
    </Section>
  );
}
