# Personal finance mockup

Run `npm install`, then `npm run dev` in this folder. Open http://127.0.0.1:4318.

The viewer renders the Agent-Native prototype.mdx directly, with React for screen navigation and Alpine for sample interactions. Styling is provisional review styling, not the approved product design system. All content is synthetic. No accounts, document uploads, persistence or financial advice engine are implemented.

Native preview: `npx @agent-native/core plan local serve --dir . --port 4317`. Its hosted viewer reads local MDX through the localhost bridge; open the URL saved in .plan-url. The standalone local viewer avoids hosted renderer limitations with state directives.
