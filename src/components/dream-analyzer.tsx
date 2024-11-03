import { Card } from '@/components/ui/card';
import { DreamForm } from './forms/dream-form';

export default function DreamAnalyzer() {
  return (
    <div className="ml-72">
      <Card className="p-8 bg-card">
        <h2 className="text-2xl font-semibold mb-6">Analyze Your Dream</h2>
        <DreamForm />
      </Card>
    </div>
  );
}