import { forwardRef } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/utils/helpers';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  required?: boolean;
  showCharCount?: boolean;
  maxLength?: number;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      error,
      success,
      helperText,
      required,
      showCharCount,
      maxLength,
      className,
      value,
      ...props
    },
    ref
  ) => {
    const charCount = typeof value === 'string' ? value.length : 0;

    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-[#94a3b8]">
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            value={value}
            maxLength={maxLength}
            className={cn(
              'w-full rounded-lg border bg-[#1a1a24] px-4 py-2.5 text-white placeholder-[#64748b] focus:outline-none transition-colors',
              error
                ? 'border-red-500 focus:border-red-500'
                : success
                ? 'border-emerald-500 focus:border-emerald-500'
                : 'border-white/[0.08] focus:border-[#547792]',
              className
            )}
            {...props}
          />
          {(error || success) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {error && <AlertCircle className="h-5 w-5 text-red-400" />}
              {success && !error && (
                <CheckCircle className="h-5 w-5 text-emerald-400" />
              )}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          {error ? (
            <p className="text-xs text-red-400">{error}</p>
          ) : helperText ? (
            <p className="text-xs text-[#64748b]">{helperText}</p>
          ) : (
            <span />
          )}
          {showCharCount && maxLength && (
            <p
              className={cn(
                'text-xs',
                charCount >= maxLength ? 'text-red-400' : 'text-[#64748b]'
              )}
            >
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

FormField.displayName = 'FormField';

// Textarea version
interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  required?: boolean;
  showCharCount?: boolean;
  maxLength?: number;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      label,
      error,
      success,
      helperText,
      required,
      showCharCount,
      maxLength,
      className,
      value,
      ...props
    },
    ref
  ) => {
    const charCount = typeof value === 'string' ? value.length : 0;

    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-[#94a3b8]">
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          value={value}
          maxLength={maxLength}
          className={cn(
            'w-full rounded-lg border bg-[#1a1a24] px-4 py-2.5 text-white placeholder-[#64748b] focus:outline-none transition-colors resize-none',
            error
              ? 'border-red-500 focus:border-red-500'
              : success
              ? 'border-emerald-500 focus:border-emerald-500'
              : 'border-white/[0.08] focus:border-[#547792]',
            className
          )}
          {...props}
        />
        <div className="flex items-center justify-between">
          {error ? (
            <p className="text-xs text-red-400">{error}</p>
          ) : helperText ? (
            <p className="text-xs text-[#64748b]">{helperText}</p>
          ) : (
            <span />
          )}
          {showCharCount && maxLength && (
            <p
              className={cn(
                'text-xs',
                charCount >= maxLength ? 'text-red-400' : 'text-[#64748b]'
              )}
            >
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';

// Select version
interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  options: { value: string; label: string }[];
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, helperText, required, options, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-[#94a3b8]">
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            'w-full rounded-lg border bg-[#1a1a24] px-4 py-2.5 text-white focus:outline-none transition-colors',
            error
              ? 'border-red-500 focus:border-red-500'
              : 'border-white/[0.08] focus:border-[#547792]',
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error ? (
          <p className="text-xs text-red-400">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-[#64748b]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';
