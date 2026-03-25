<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Link from '@tiptap/extension-link';
	import Underline from '@tiptap/extension-underline';
	import TextAlign from '@tiptap/extension-text-align';
	import { TextStyle } from '@tiptap/extension-text-style';
	import Color from '@tiptap/extension-color';
	import Highlight from '@tiptap/extension-highlight';

	let { name, value = $bindable('') }: { name: string; value?: string } = $props();

	let editorEl: HTMLDivElement;
	let editor: Editor | null = $state(null);
	let colorInput: HTMLInputElement;
	let highlightInput: HTMLInputElement;

	onMount(() => {
		editor = new Editor({
			element: editorEl,
			extensions: [
				StarterKit,
				Underline,
				Link.configure({ openOnClick: false }),
				TextAlign.configure({ types: ['heading', 'paragraph'] }),
				TextStyle,
				Color,
				Highlight.configure({ multicolor: true })
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

	// Sync external value changes (e.g. "Copy from English" button) into TipTap
	$effect(() => {
		if (editor && value !== editor.getHTML()) {
			editor.commands.setContent(value, false);
		}
	});

	function toggle(command: string, attrs?: Record<string, unknown>) {
		if (!editor) return;
		const chain = editor.chain().focus();
		switch (command) {
			case 'bold': chain.toggleBold().run(); break;
			case 'italic': chain.toggleItalic().run(); break;
			case 'underline': chain.toggleUnderline().run(); break;
			case 'strike': chain.toggleStrike().run(); break;
			case 'h1': chain.toggleHeading({ level: 1 }).run(); break;
			case 'h2': chain.toggleHeading({ level: 2 }).run(); break;
			case 'h3': chain.toggleHeading({ level: 3 }).run(); break;
			case 'h4': chain.toggleHeading({ level: 4 }).run(); break;
			case 'align-left': chain.setTextAlign('left').run(); break;
			case 'align-center': chain.setTextAlign('center').run(); break;
			case 'align-right': chain.setTextAlign('right').run(); break;
			case 'align-justify': chain.setTextAlign('justify').run(); break;
			case 'color': colorInput?.click(); break;
			case 'uncolor': chain.unsetColor().run(); break;
			case 'highlight': highlightInput?.click(); break;
			case 'unhighlight': chain.unsetHighlight().run(); break;
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
			case 'undo': chain.undo().run(); break;
			case 'redo': chain.redo().run(); break;
		}
	}

	function active(command: string): boolean {
		if (!editor) return false;
		switch (command) {
			case 'bold': return editor.isActive('bold');
			case 'italic': return editor.isActive('italic');
			case 'underline': return editor.isActive('underline');
			case 'strike': return editor.isActive('strike');
			case 'h1': return editor.isActive('heading', { level: 1 });
			case 'h2': return editor.isActive('heading', { level: 2 });
			case 'h3': return editor.isActive('heading', { level: 3 });
			case 'h4': return editor.isActive('heading', { level: 4 });
			case 'align-left': return editor.isActive({ textAlign: 'left' });
			case 'align-center': return editor.isActive({ textAlign: 'center' });
			case 'align-right': return editor.isActive({ textAlign: 'right' });
			case 'align-justify': return editor.isActive({ textAlign: 'justify' });
			case 'bullet': return editor.isActive('bulletList');
			case 'ordered': return editor.isActive('orderedList');
			case 'blockquote': return editor.isActive('blockquote');
			case 'link': return editor.isActive('link');
			default: return false;
		}
	}

	function onColorInput(e: Event) {
		const hex = (e.target as HTMLInputElement).value;
		editor?.chain().focus().setColor(hex).run();
	}

	function onHighlightInput(e: Event) {
		const hex = (e.target as HTMLInputElement).value;
		editor?.chain().focus().setHighlight({ color: hex }).run();
	}

	function btn(cmd: string, title: string) {
		return { cmd, title, active: active(cmd) };
	}
</script>

<input type="hidden" {name} bind:value />

<!-- Hidden color inputs -->
<input bind:this={colorInput} type="color" class="sr-only" oninput={onColorInput} />
<input bind:this={highlightInput} type="color" class="sr-only" value="#ffff00" oninput={onHighlightInput} />

<div class="overflow-hidden rounded-lg border border-gray-300 focus-within:border-crf-blue focus-within:ring-1 focus-within:ring-crf-blue">
	<!-- Toolbar -->
	<div class="flex flex-wrap items-center gap-0.5 border-b border-gray-200 bg-gray-50 px-2 py-1.5">

		<!-- Undo / Redo -->
		<button type="button" title="Undo" onclick={() => toggle('undo')}
			class="rounded p-1.5 text-gray-600 hover:bg-gray-200 transition">
			<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13"/></svg>
		</button>
		<button type="button" title="Redo" onclick={() => toggle('redo')}
			class="rounded p-1.5 text-gray-600 hover:bg-gray-200 transition">
			<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 019-9 9 9 0 016 2.3L21 13"/></svg>
		</button>

		<div class="mx-1 w-px self-stretch bg-gray-300"></div>

		<!-- Text style -->
		{#each [
			{ cmd: 'bold',      title: 'Bold',      svg: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h8a4 4 0 010 8H6V4zm0 8h9a4 4 0 010 8H6v-8z"/></svg>' },
			{ cmd: 'italic',    title: 'Italic',    svg: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11 4h6l-1 2h-2l-4 12h2l-1 2H5l1-2h2l4-12H10l1-2z"/></svg>' },
			{ cmd: 'underline', title: 'Underline', svg: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6 3v7a6 6 0 0012 0V3h-2v7a4 4 0 01-8 0V3H6zm-1 15h14v2H5v-2z"/></svg>' },
			{ cmd: 'strike',    title: 'Strikethrough', svg: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.3 10.2c-.2-.5-.6-.9-1-1.2C15.4 8.4 14.4 8 13 8c-.8 0-1.4.1-2 .4-.5.3-.9.6-1.2 1-.3.4-.4.9-.4 1.4 0 .6.2 1.1.5 1.5.2.3.5.5.8.7H4v2h16v-2h-3.1c.2-.3.3-.6.4-1zm-7.8-1.5c.4-.4 1-.6 1.8-.6.7 0 1.3.2 1.7.5.4.3.6.8.6 1.4H7.9c.1-.5.3-1 .7-1.3h.9zM12 17c.8 0 1.5-.2 2-.5.5-.3.8-.8.8-1.5h-5.6c.3.5.8 1 1.4 1.4.4.3.9.5 1.4.6z"/></svg>' }
		] as item}
			<button type="button" title={item.title} onclick={() => toggle(item.cmd)}
				class="rounded p-1.5 transition {active(item.cmd) ? 'bg-crf-blue text-white' : 'text-gray-600 hover:bg-gray-200'}">
				{@html item.svg}
			</button>
		{/each}

		<div class="mx-1 w-px self-stretch bg-gray-300"></div>

		<!-- Headings -->
		{#each [
			{ cmd: 'h1', label: 'H1' },
			{ cmd: 'h2', label: 'H2' },
			{ cmd: 'h3', label: 'H3' },
			{ cmd: 'h4', label: 'H4' }
		] as item}
			<button type="button" title="Heading {item.label.slice(1)}" onclick={() => toggle(item.cmd)}
				class="rounded px-1.5 py-1 text-xs font-bold transition {active(item.cmd) ? 'bg-crf-blue text-white' : 'text-gray-600 hover:bg-gray-200'}">
				{item.label}
			</button>
		{/each}

		<div class="mx-1 w-px self-stretch bg-gray-300"></div>

		<!-- Alignment -->
		{#each [
			{ cmd: 'align-left',    title: 'Align left',    svg: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3 5h18v2H3V5zm0 4h12v2H3V9zm0 4h18v2H3v-2zm0 4h12v2H3v-2z"/></svg>' },
			{ cmd: 'align-center',  title: 'Align center',  svg: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3 5h18v2H3V5zm3 4h12v2H6V9zm-3 4h18v2H3v-2zm3 4h12v2H6v-2z"/></svg>' },
			{ cmd: 'align-right',   title: 'Align right',   svg: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3 5h18v2H3V5zm6 4h12v2H9V9zm-6 4h18v2H3v-2zm6 4h12v2H9v-2z"/></svg>' },
			{ cmd: 'align-justify', title: 'Justify',       svg: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3 5h18v2H3V5zm0 4h18v2H3V9zm0 4h18v2H3v-2zm0 4h12v2H3v-2z"/></svg>' }
		] as item}
			<button type="button" title={item.title} onclick={() => toggle(item.cmd)}
				class="rounded p-1.5 transition {active(item.cmd) ? 'bg-crf-blue text-white' : 'text-gray-600 hover:bg-gray-200'}">
				{@html item.svg}
			</button>
		{/each}

		<div class="mx-1 w-px self-stretch bg-gray-300"></div>

		<!-- Text color -->
		<div class="flex items-center gap-0.5">
			<button type="button" title="Text color" onclick={() => toggle('color')}
				class="rounded p-1.5 text-gray-600 hover:bg-gray-200 transition">
				<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
					<path d="M11 3L5.5 17h2.25l1.12-3h6.25l1.12 3H18.5L13 3h-2zm-1.38 9L12 6.67 14.38 12H9.62z"/>
					<rect x="3" y="19" width="18" height="2" rx="1"/>
				</svg>
			</button>
			<button type="button" title="Clear text color" onclick={() => toggle('uncolor')}
				class="rounded p-1 text-xs text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition leading-none">✕</button>
		</div>

		<!-- Highlight -->
		<div class="flex items-center gap-0.5">
			<button type="button" title="Highlight color" onclick={() => toggle('highlight')}
				class="rounded p-1.5 text-gray-600 hover:bg-gray-200 transition">
				<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
					<path d="M15.5 2.1L11 6.6 7.5 3 6 4.5l2 2-5.5 5.5a1 1 0 000 1.4l5 5a1 1 0 001.4 0L14.5 13l2 2 1.5-1.5-3.5-3.5 4.5-4.5-3.5-3.4zM9 15l-3.5-3.5 5-5L14 10 9 15z"/>
					<rect x="3" y="19" width="18" height="2" rx="1"/>
				</svg>
			</button>
			<button type="button" title="Clear highlight" onclick={() => toggle('unhighlight')}
				class="rounded p-1 text-xs text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition leading-none">✕</button>
		</div>

		<div class="mx-1 w-px self-stretch bg-gray-300"></div>

		<!-- Lists & blocks -->
		{#each [
			{ cmd: 'bullet',     title: 'Bullet list',    svg: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><circle cx="4" cy="7" r="1.5"/><rect x="7" y="6" width="14" height="2" rx="1"/><circle cx="4" cy="12" r="1.5"/><rect x="7" y="11" width="14" height="2" rx="1"/><circle cx="4" cy="17" r="1.5"/><rect x="7" y="16" width="14" height="2" rx="1"/></svg>' },
			{ cmd: 'ordered',    title: 'Ordered list',   svg: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3 5h2v1H4v1h1v1H3V9h3V3H3v2zm0 8h1.8l-1.8 2.1V17h3v-2H4.2l1.8-2V11H3v2zm1 4H3v1h2v.5H4v1h1v.5H3v1h3v-4H4v-1H3zm5-12v2h13V5H9zm0 6h13v-2H9v2zm0 6h13v-2H9v2z"/></svg>' },
			{ cmd: 'blockquote', title: 'Blockquote',     svg: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3 6h4v4H5a3 3 0 003 3v2a5 5 0 01-5-5V6zm9 0h4v4h-2a3 3 0 003 3v2a5 5 0 01-5-5V6z"/></svg>' }
		] as item}
			<button type="button" title={item.title} onclick={() => toggle(item.cmd)}
				class="rounded p-1.5 transition {active(item.cmd) ? 'bg-crf-blue text-white' : 'text-gray-600 hover:bg-gray-200'}">
				{@html item.svg}
			</button>
		{/each}

		<div class="mx-1 w-px self-stretch bg-gray-300"></div>

		<!-- Link / HR -->
		<button type="button" title="Add link" onclick={() => toggle('link')}
			class="rounded p-1.5 transition {active('link') ? 'bg-crf-blue text-white' : 'text-gray-600 hover:bg-gray-200'}">
			<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
		</button>
		<button type="button" title="Remove link" onclick={() => toggle('unlink')}
			class="rounded p-1.5 text-gray-600 hover:bg-gray-200 transition">
			<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
		</button>
		<button type="button" title="Horizontal rule" onclick={() => toggle('hr')}
			class="rounded p-1.5 text-gray-600 hover:bg-gray-200 transition">
			<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="11" width="20" height="2" rx="1"/></svg>
		</button>

	</div>

	<!-- Editor area -->
	<div bind:this={editorEl} class="bg-white"></div>
</div>
