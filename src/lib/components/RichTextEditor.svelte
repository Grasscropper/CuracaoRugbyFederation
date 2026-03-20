<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Link from '@tiptap/extension-link';
	import Underline from '@tiptap/extension-underline';

	let { name, value = $bindable('') }: { name: string; value?: string } = $props();

	let editorEl: HTMLDivElement;
	let editor: Editor | null = $state(null);

	onMount(() => {
		editor = new Editor({
			element: editorEl,
			extensions: [
				StarterKit,
				Underline,
				Link.configure({ openOnClick: false })
			],
			content: value,
			editorProps: {
				attributes: {
					class: 'prose prose-sm max-w-none min-h-[8rem] px-4 py-3 focus:outline-none'
				}
			},
			onUpdate({ editor: e }) {
				value = e.getHTML();
			}
		});
	});

	onDestroy(() => editor?.destroy());

	function toggle(command: string, attrs?: Record<string, unknown>) {
		if (!editor) return;
		const chain = editor.chain().focus();
		switch (command) {
			case 'bold': chain.toggleBold().run(); break;
			case 'italic': chain.toggleItalic().run(); break;
			case 'underline': chain.toggleUnderline().run(); break;
			case 'h2': chain.toggleHeading({ level: 2 }).run(); break;
			case 'h3': chain.toggleHeading({ level: 3 }).run(); break;
			case 'bullet': chain.toggleBulletList().run(); break;
			case 'ordered': chain.toggleOrderedList().run(); break;
			case 'blockquote': chain.toggleBlockquote().run(); break;
			case 'hr': chain.setHorizontalRule().run(); break;
			case 'link': {
				const url = prompt('URL');
				if (url) chain.setLink({ href: url }).run();
				break;
			}
			case 'unlink': chain.unsetLink().run(); break;
		}
	}

	function active(command: string): boolean {
		if (!editor) return false;
		switch (command) {
			case 'bold': return editor.isActive('bold');
			case 'italic': return editor.isActive('italic');
			case 'underline': return editor.isActive('underline');
			case 'h2': return editor.isActive('heading', { level: 2 });
			case 'h3': return editor.isActive('heading', { level: 3 });
			case 'bullet': return editor.isActive('bulletList');
			case 'ordered': return editor.isActive('orderedList');
			case 'blockquote': return editor.isActive('blockquote');
			case 'link': return editor.isActive('link');
			default: return false;
		}
	}

	const toolbar = [
		[
			{ cmd: 'bold', icon: 'B', title: 'Bold', style: 'font-bold' },
			{ cmd: 'italic', icon: 'I', title: 'Italic', style: 'italic' },
			{ cmd: 'underline', icon: 'U', title: 'Underline', style: 'underline' }
		],
		[
			{ cmd: 'h2', icon: 'H2', title: 'Heading 2', style: 'font-bold text-xs' },
			{ cmd: 'h3', icon: 'H3', title: 'Heading 3', style: 'font-bold text-xs' }
		],
		[
			{ cmd: 'bullet', icon: '≡', title: 'Bullet list', style: 'text-lg leading-none' },
			{ cmd: 'ordered', icon: '1.', title: 'Ordered list', style: 'font-bold text-xs' },
			{ cmd: 'blockquote', icon: '❝', title: 'Blockquote', style: '' }
		],
		[
			{ cmd: 'link', icon: '🔗', title: 'Add link', style: '' },
			{ cmd: 'unlink', icon: '✂', title: 'Remove link', style: '' },
			{ cmd: 'hr', icon: '—', title: 'Horizontal rule', style: '' }
		]
	];
</script>

<input type="hidden" {name} bind:value />

<div class="overflow-hidden rounded-lg border border-gray-300 focus-within:border-crf-blue focus-within:ring-1 focus-within:ring-crf-blue">
	<!-- Toolbar -->
	<div class="flex flex-wrap gap-0.5 border-b border-gray-200 bg-gray-50 px-2 py-1.5">
		{#each toolbar as group, i}
			{#if i > 0}<div class="mx-1 w-px self-stretch bg-gray-300"></div>{/if}
			{#each group as btn}
				<button
					type="button"
					title={btn.title}
					onclick={() => toggle(btn.cmd)}
					class="rounded px-2 py-1 text-sm transition {btn.style} {active(btn.cmd) ? 'bg-crf-blue text-white' : 'text-gray-600 hover:bg-gray-200'}"
				>
					{btn.icon}
				</button>
			{/each}
		{/each}
	</div>

	<!-- Editor area -->
	<div bind:this={editorEl} class="bg-white"></div>
</div>
