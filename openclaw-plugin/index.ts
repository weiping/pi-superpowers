// Minimal type for the OpenClaw plugin API (openclaw is a peerDep)
type BeforeAgentStartEvent = {
  prompt: string;
  messages?: unknown[];
};

type BeforeAgentStartResult = {
  prependContext?: string;
  systemPrompt?: string;
};

type PluginApi = {
  on(
    hookName: "before_agent_start" | "before_prompt_build",
    handler: (
      event: BeforeAgentStartEvent,
      ctx?: unknown,
    ) => BeforeAgentStartResult | void | Promise<BeforeAgentStartResult | void>,
    opts?: { priority?: number },
  ): void;
};

const TOOL_MAPPING = `
## Superpowers Skills — OpenClaw 工具映射

当前运行环境为 OpenClaw。Skills 文档中的工具引用按以下规则映射：

| Skills 文档中引用 | OpenClaw 实际用法 |
|---|---|
| \`dispatch_agent\` | 使用 \`sessions_spawn\` 工具（主要参数：\`prompt\`, \`agentId\`）派发子代理 |
| \`bash\` | 直接使用（相同） |
| \`read\` / \`write\` / \`edit\` | 直接使用（相同） |
| \`TodoWrite\` | 用 \`write\`/\`edit\` 工具操作 \`TODO.md\` |

使用 \`/skill <name>\` 可强制加载任意技能。
`.trim();

export default function register(api: PluginApi): void {
  api.on("before_prompt_build", () => ({
    prependContext: TOOL_MAPPING,
  }));
}
