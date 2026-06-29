import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function StyleguidePage() {
  return (
    <div className="space-y-8">
      <header className="rounded-[28px] border border-border bg-white p-8 shadow-card">
        <h1 className="text-3xl font-semibold text-text">Design system preview</h1>
        <p className="mt-3 text-muted">Reusable UI patterns for Realty Assistant.</p>
      </header>
      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="p-8">
          <h2 className="text-xl font-semibold text-text">Buttons</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </Card>
        <Card className="p-8">
          <h2 className="text-xl font-semibold text-text">Form elements</h2>
          <div className="mt-5 space-y-4">
            <Input placeholder="Text input" />
            <Input placeholder="Search input" />
          </div>
        </Card>
      </section>
      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="p-8">
          <h2 className="text-xl font-semibold text-text">Badges</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Badge>Live</Badge>
            <Badge variant="secondary">Draft</Badge>
          </div>
        </Card>
      </section>
    </div>
  );
}
