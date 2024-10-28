import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto max-w-4xl border-white/15 bg-white/10 text-white">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-6">
              <Section
                title="1. Information We Collect"
                content="We collect information you provide directly to us, such as when you create an account, use our services, or communicate with us. This may include your name, email address, and any other information you choose to provide."
              />
              <Section
                title="2. How We Use Your Information"
                content="We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to personalize your experience. We may also use the information for research and analytics purposes."
              />
              <Section
                title="3. Information Sharing and Disclosure"
                content="We do not share your personal information with third parties except as described in this policy. We may share information with service providers, for legal reasons, or in connection with a merger or acquisition."
              />
              <Section
                title="4. Data Security"
                content="We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no security system is impenetrable and we cannot guarantee the security of our systems 100%."
              />
              <Section
                title="5. Your Rights and Choices"
                content="You may have certain rights regarding your personal information, including the right to access, correct, or delete the information we have about you. You can also opt out of certain data collection and use practices."
              />
              <Section
                title="6. Cookies and Similar Technologies"
                content="We use cookies and similar technologies to collect information about how you use our services and to personalize your experience. You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies."
              />
              <Section
                title="7. Children's Privacy"
                content="Our services are not intended for children under the age of 13, and we do not knowingly collect personal information from children under 13. If we learn we have collected personal information of a child under 13, we will delete such information."
              />
              <Section
                title="8. Changes to This Policy"
                content="We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the 'Last Updated' date at the top of this policy."
              />
              <Section
                title="9. Contact Us"
                content="If you have any questions about this privacy policy or our data practices, please contact us at [your contact email]."
              />
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      <div className="mt-6 text-center">
        <Link href="/" className="text-primary hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

function Section({ title, content }) {
  return (
    <section className="space-y-2">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-muted-foreground">{content}</p>
    </section>
  );
}
