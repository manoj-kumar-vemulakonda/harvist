You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
```tsx
menu-toggle.tsx
'use client';
import React from 'react';
import { cn } from '@/lib/utils';

type MenuToggleProps = React.ComponentProps<'svg'> & {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export function MenuToggle({
	open,
	onOpenChange,
	className,
	fill = 'none',
	stroke = 'currentColor',
	strokeWidth = 2,
	strokeLinecap = 'round',
	strokeLinejoin = 'round',
	...props
}: MenuToggleProps) {
	return (
		<label className="flex cursor-pointer items-center justify-center">
			<input className="hidden" type="checkbox" onChange={() => onOpenChange(!open)} checked={open} />
			<svg
				strokeWidth={strokeWidth}
				fill={fill}
				stroke={stroke}
				viewBox="0 0 32 32"
				strokeLinecap={strokeLinecap}
				strokeLinejoin={strokeLinejoin}
				className={cn('size-4 transition-transform duration-600 ease-out', open && '-rotate-45', className)}
				{...props}
			>
				<path
					className={cn(
						'transition-all duration-600 ease-out',
						open ? '[stroke-dasharray:20_300] [stroke-dashoffset:-32.42px]' : '[stroke-dasharray:12_63]',
					)}
					d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
				/>
				<path d="M7 16 27 16" />
			</svg>
		</label>
	);
}


demo.tsx
import React from 'react';
import { MenuToggle } from '@/components/ui/menu-toggle';

export default function DemoOne() {
	const [open, setOpen] = React.useState(false);

	return (
		<div className="flex min-h-screen w-full items-center justify-center">
			<MenuToggle strokeWidth={3} open={open} onOpenChange={setOpen} className="size-16" />
		</div>
	);
}

```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's argumens and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Copy paste all the code above in the correct directories
 1. Install external dependencies
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them
