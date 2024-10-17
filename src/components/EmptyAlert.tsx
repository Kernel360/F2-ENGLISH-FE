import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { AlertCircleIcon } from 'lucide-react';

interface EmptyAlertProps {
  alertTitle?: string;
  alertDescription?: string;
}

export default function EmptyAlert({
  alertTitle,
  alertDescription,
}: EmptyAlertProps) {
  return (
    <Alert>
      {/* <InfoCircledIcon className="h-4 w-4" /> */}
      <div className="flex  space-x-1 items-center ">
        <AlertCircleIcon className="h-4 w-4" />
        <AlertTitle>{alertTitle}</AlertTitle>
        <AlertDescription>{alertDescription}</AlertDescription>
      </div>
    </Alert>
  );
}
