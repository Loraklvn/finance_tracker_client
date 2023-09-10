import { forwardRef } from 'react';

import InputText from '@/components/form/InputText';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomDateInput = forwardRef<any, any>(({ value, onClick }, ref) => (
  <InputText
    inputSize="sm"
    onClick={onClick}
    passedRef={ref}
    readOnly
    value={value}
  />
));

export default CustomDateInput;
