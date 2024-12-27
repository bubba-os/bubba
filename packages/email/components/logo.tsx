import { getEmailUrl } from "@bubba/utils/envs";
import { Img, Section } from "@react-email/components";

const baseUrl = getEmailUrl();

export function Logo() {
  return (
    <Section className="mt-[32px]">
      <Img
        src={`${baseUrl}/favicon-32x32.png`}
        width="45"
        height="45"
        alt="Bubba AI"
        className="my-0 mx-auto block"
      />
    </Section>
  );
}
