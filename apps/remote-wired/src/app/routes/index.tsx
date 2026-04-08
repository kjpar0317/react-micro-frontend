import { createFileRoute } from '@tanstack/react-router';
import Widget from '../components/Widget';

export const Route = createFileRoute('/')({
  component: Widget,
});
