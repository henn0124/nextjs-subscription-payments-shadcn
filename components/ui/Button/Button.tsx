'use client';

import React from 'react';
import cn from 'classnames';
import { forwardRef, useRef, ButtonHTMLAttributes } from 'react';

import LoadingDots from '@/components/ui/LoadingDots';

import styles from './Button.module.css';

// Custom mergeRefs function
const mergeRefs = (...refs: React.Ref<HTMLButtonElement>[]) => {
  return (value: HTMLButtonElement | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<HTMLButtonElement | null>).current = value;
      }
    });
  };
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'slim' | 'flat';
  active?: boolean;
  width?: number;
  loading?: boolean;
  Component?: React.ElementType;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  (props, forwardedRef) => {
    const {
      className,
      variant = 'flat',
      children,
      active,
      width,
      loading = false,
      disabled = false,
      style = {},
      Component = 'button',
      ...rest
    } = props;
    const innerRef = useRef<HTMLButtonElement>(null);
    const rootClassName = cn(
      styles.root,
      {
        [styles.slim]: variant === 'slim',
        [styles.loading]: loading,
        [styles.disabled]: disabled
      },
      className
    );
    return (
      <Component
        aria-pressed={active}
        data-variant={variant}
        ref={mergeRefs(innerRef, forwardedRef)}
        className={rootClassName}
        disabled={disabled}
        style={{
          width,
          ...style
        }}
        {...rest}
      >
        {children}
        {loading && (
          <i className="flex pl-2 m-0">
            <LoadingDots />
          </i>
        )}
      </Component>
    );
  }
);
Button.displayName = 'Button';

export default Button;
