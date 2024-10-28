import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto max-w-4xl border-white/15 bg-white/10 text-white">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-6">
              <Section
                title="1. Acceptance of Terms"
                content="By accessing or using our service, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service."
              />
              <Section
                title="2. Description of Service"
                content="Our service provides Bug reporting Service. We reserve the right to modify or discontinue, temporarily or permanently, the service with or without notice."
              />
              <Section
                title="3. User Accounts"
                content="You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password. You agree not to disclose your password to any third party."
              />
              <Section
                title="4. Content"
                content="Our service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content that you post to the service."
              />
              <Section
                title="5. Intellectual Property"
                content="The service and its original content, features, and functionality are and will remain the exclusive property of [Your Company Name] and its licensors."
              />
              <Section
                title="6. Termination"
                content="We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms."
              />
              <Section
                title="7. Limitation of Liability"
                content="In no event shall [Your Company Name], nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages."
              />
              <Section
                title="8. Changes to Terms"
                content="We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion."
              />
              <Section
                title="9. Contact Us"
                content="If you have any questions about these Terms, please contact us at [your contact email]."
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
