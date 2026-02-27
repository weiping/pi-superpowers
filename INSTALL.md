# 安装指南 · pi-superpowers

本文档覆盖 **pi-superpowers** 在 Pi 平台的完整安装流程，包括先决条件、多种安装方式、验证步骤、选择性加载配置，以及卸载和常见问题排查。

---

## 目录

- [先决条件](#先决条件)
- [安装方式](#安装方式)
  - [方式 A：提示词自动安装（推荐）](#方式-a提示词自动安装推荐)
  - [方式 B：本地路径安装](#方式-b本地路径安装)
  - [方式 C：Git 仓库安装](#方式-cgit-仓库安装)
  - [方式 D：临时加载（不写入配置）](#方式-d临时加载不写入配置)
- [全局安装 vs 项目级安装](#全局安装-vs-项目级安装)
- [安装验证](#安装验证)
- [选择性加载配置](#选择性加载配置)
- [卸载](#卸载)
- [常见问题](#常见问题)

---

## 先决条件

1. **Pi 已安装并可运行**

   ```bash
   pi --version   # 确认 Pi 可用
   ```

   如尚未安装，参考 Pi 官方文档进行安装。

2. **Node.js ≥ 18**（Bootstrap 扩展为 TypeScript，需要 Node.js 运行时）

   ```bash
   node --version   # 应为 v18.0.0 或更高
   ```

3. **Git**（提示词安装和 Git 仓库安装方式需要）

   ```bash
   git --version
   ```

---

## 安装方式

### 方式 A：提示词自动安装（推荐）

在已启动的 Pi 会话中粘贴以下任意一行提示词，Pi 会自动完成 **环境检查 → 克隆仓库 → 注册包 → 验证** 全流程，并在完成后提示你重启：

#### 在线安装（从 GitHub 克隆）

```
Fetch and follow the installation instructions from https://raw.githubusercontent.com/weiping/pi-superpowers/main/.pi/INSTALL.md
```

Pi 会用 `curl`/`bash` 工具获取 `.pi/INSTALL.md` 中的指令，然后逐步执行。

#### 离线安装（使用本地已有副本）

```
Read and follow the installation instructions in /Users/liuweiping/repos/pi-superpowers/.pi/INSTALL.md
```

#### 极速内联提示（无需网络，无需 INSTALL.md 文件）

```
Clone https://github.com/weiping/pi-superpowers to ~/.pi/packages/pi-superpowers with depth 1, run pi install ~/.pi/packages/pi-superpowers, then tell me the install is complete and I need to restart Pi.
```

> 💡 **原理**：Pi 的 AI 会将提示词翻译为 `bash` 工具调用，依次执行 `git clone` 和 `pi install`，与 superpowers 在 OpenCode/Codex 上的一键安装机制完全一致。

安装完成后**重启 Pi**（退出并重启）使更改生效。

---

### 方式 B：本地路径安装

将本机目录中的 pi-superpowers 注册到 Pi 配置（适合开发或已有本地副本）：

```bash
# 全局安装（所有项目可用）
pi install /Users/liuweiping/repos/pi-superpowers

# 或项目级安装（仅当前项目生效，写入 .pi/settings.json）
pi install -l /Users/liuweiping/repos/pi-superpowers
```

> ⚠️ 本地路径安装是**引用而非复制**。移动或删除源目录后需重新安装。

---

### 方式 C：Git 仓库安装

当 pi-superpowers 发布到 GitHub 后，可直接从 Git 安装（Pi 自动克隆并 `npm install`）：

```bash
# HTTPS（推荐，无需 SSH key）
pi install https://github.com/weiping/pi-superpowers

# 锁定到指定版本标签（锁定后 pi update 不会自动升级）
pi install https://github.com/weiping/pi-superpowers@v1.0.0

# git: 短格式
pi install git:github.com/weiping/pi-superpowers

# SSH（需要配置 SSH key）
pi install git:git@github.com:weiping/pi-superpowers
```

Pi 会将仓库克隆到 `~/.pi/agent/git/github.com/weiping/pi-superpowers/`，并自动运行 `npm install`。

---

### 方式 D：临时加载（不写入配置）

试用或调试时，用 `-e` 标志仅为**本次运行**加载，不修改任何配置文件：

```bash
# 临时加载扩展（仅本次 Pi 运行有效）
pi -e /Users/liuweiping/repos/pi-superpowers/extensions/bootstrap.ts

# 同时指定技能目录（完整临时体验）
pi -e /Users/liuweiping/repos/pi-superpowers/extensions/bootstrap.ts \
   --skill /Users/liuweiping/repos/pi-superpowers/skills
```

---

## 全局安装 vs 项目级安装

| | 全局安装 | 项目级安装 |
|---|---------|---------|
| **命令** | `pi install <source>` | `pi install -l <source>` |
| **配置文件** | `~/.pi/agent/settings.json` | `.pi/settings.json`（项目根目录） |
| **生效范围** | 所有项目 | 仅当前项目 |
| **团队共享** | ❌ 只影响本机 | ✅ 提交 `.pi/settings.json` 即可共享 |
| **自动安装** | ❌ | ✅ 团队成员启动 Pi 时自动安装缺失包 |

**推荐策略**：

- 个人开发流程工具（如 pi-superpowers）→ **全局安装**
- 项目特定工作流 → **项目级安装** + 提交 `.pi/settings.json`

---

## 安装验证

安装完成并**重启 Pi** 后，按以下步骤确认一切正常：

### 步骤 1：检查 Pi 已识别技能

启动 Pi，观察启动输出中是否列出 superpowers 技能：

```
pi
```

启动头部应看到类似输出：

```
Skills  brainstorming, dispatching-parallel-agents, executing-plans,
        finishing-a-development-branch, receiving-code-review,
        requesting-code-review, subagent-driven-development,
        systematic-debugging, test-driven-development,
        using-git-worktrees, using-superpowers, verification-before-completion,
        writing-plans, writing-skills
```

### 步骤 2：确认 Bootstrap 扩展加载通知

Pi 启动时应显示通知：

```
✦ pi-superpowers loaded (superpowers skills available)
```

若无此通知，说明扩展未正确加载，参考[常见问题](#常见问题)排查。

### 步骤 3：测试技能自动触发

```
你：我想做一个用户登录功能
```

**期望行为**：AI 声明"Using brainstorming skill to..."，然后开始需求分析，而**不是**直接写代码。

### 步骤 4：测试中文触发

```
你：这个测试一直报错，帮我调试一下
```

**期望行为**：AI 声明"Using systematic-debugging skill to..."，开始系统性根因分析流程。

### 步骤 5：测试提示模板命令

```
/头脑风暴 实现一个购物车模块
```

**期望行为**：AI 进入 brainstorming 技能流程，开始探索需求和设计方案。

### 步骤 6：确认 `dispatch_agent` 工具已注册

在 Pi 会话中输入：

```
你：列出所有可用工具
```

**期望行为**：工具列表中出现 `dispatch_agent`（Dispatch Subagent）。

也可直接测试：

```
你：使用 dispatch_agent 工具，派发一个子代理帮我检查当前目录下的文件数量
```

**期望行为**：AI 调用 `dispatch_agent` 工具，`pi --no-session --print` 子进程运行并返回结果。

> ⚠️ `dispatch_agent` 需要 `pi` 二进制在 `$PATH` 中可访问。若报 `ENOENT` 错误，说明 `pi` 命令不在 PATH 中，顺序执行降级模式仍可正常使用。

---

## 选择性加载配置

如需只加载部分技能或禁用某些组件，通过 `settings.json` 过滤：

### 只加载指定技能（跳过其余）

在 `~/.pi/agent/settings.json` 中：

```json
{
  "packages": [
    {
      "source": "/Users/liuweiping/repos/pi-superpowers",
      "skills": [
        "skills/test-driven-development",
        "skills/systematic-debugging",
        "skills/verification-before-completion"
      ],
      "prompts": []
    }
  ]
}
```

### 只加载扩展，不加载技能（仅 Bootstrap 注入）

```json
{
  "packages": [
    {
      "source": "/Users/liuweiping/repos/pi-superpowers",
      "skills": [],
      "prompts": []
    }
  ]
}
```

### 禁用所有扩展（仅用技能，不自动注入，不注册 dispatch_agent）

```json
{
  "packages": [
    {
      "source": "/Users/liuweiping/repos/pi-superpowers",
      "extensions": []
    }
  ]
}
```

### 只禁用 `dispatch_agent`（保留 Bootstrap 注入）

```json
{
  "packages": [
    {
      "source": "/Users/liuweiping/repos/pi-superpowers",
      "extensions": ["./extensions/bootstrap.ts"]
    }
  ]
}
```

### 排除个别技能（加载其余全部）

```json
{
  "packages": [
    {
      "source": "/Users/liuweiping/repos/pi-superpowers",
      "skills": ["!skills/writing-skills", "!skills/using-superpowers"]
    }
  ]
}
```

> 也可在交互模式中通过 `/settings` → Enable/Disable Resources 进行可视化配置。

---

## 卸载

```bash
# 全局卸载
pi remove /Users/liuweiping/repos/pi-superpowers

# 项目级卸载（从 .pi/settings.json 移除）
pi remove -l /Users/liuweiping/repos/pi-superpowers
```

若通过 Git 安装：
```bash
pi remove https://github.com/weiping/pi-superpowers
```

---

## 常见问题

### ❓ 启动时未显示 superpowers 技能列表

**原因**：Pi 未找到 skills 目录，或 package.json 中的路径配置有误。

**排查**：

```bash
# 确认 skills 目录存在且包含 SKILL.md 文件
ls /Users/liuweiping/repos/pi-superpowers/skills/*/SKILL.md

# 确认 package.json 中声明了 skills 路径
cat /Users/liuweiping/repos/pi-superpowers/package.json | grep -A5 '"pi"'
```

**修复**：重新安装并确认路径无误：
```bash
pi remove /Users/liuweiping/repos/pi-superpowers
pi install /Users/liuweiping/repos/pi-superpowers
```

---

### ❓ 提示词安装后无变化

**可能原因**：

1. `pi install` 写入了配置，但 Pi 需要重启才生效
2. AI 执行了命令但未汇报

**解决方案**：

```bash
# 1. 手动重启 Pi
# 2. 确认安装记录
pi list
# 若输出包含 pi-superpowers，说明安装成功，重启即可
```

---

### ❓ 未看到 "pi-superpowers loaded" 通知

**原因**：Bootstrap 扩展加载失败，通常是 TypeScript 解析问题或路径错误。

**排查**：

```bash
# 临时方式验证扩展是否能加载
pi -e /Users/liuweiping/repos/pi-superpowers/extensions/bootstrap.ts
```

在 Pi 中通过 `/settings` 查看已安装的包和已启用的扩展列表。

---

### ❓ AI 没有自动触发技能（直接写代码）

**解决方案**：

```bash
# 方案 1：强制加载技能（最可靠）
/skill:brainstorming

# 方案 2：强制提示模板
/头脑风暴 我要做 xxx

# 方案 3：在消息中明确说明
你：使用 TDD 方式实现这个功能
```

---

### ❓ 运行测试套件验证安装完整性

```bash
cd /Users/liuweiping/repos/pi-superpowers
npm test
# 期望：6 test files, 176 tests passed
```

---

### ❓ 项目共享：团队成员如何使用

将 `.pi/settings.json` 提交到版本库：

```json
{
  "packages": [
    "https://github.com/weiping/pi-superpowers@v1.0.0"
  ]
}
```

团队成员启动 Pi 时会自动安装缺失包。

---

## 配置文件位置参考

| 文件 | 作用 |
|------|------|
| `~/.pi/agent/settings.json` | 全局 Pi 配置（包、技能、扩展开关） |
| `.pi/settings.json` | 项目级配置（可提交共享） |
| `~/.pi/agent/skills/` | 手动放置的全局技能目录 |
| `.agents/skills/` | 项目级技能目录（Pi 自动扫描） |
| `~/.pi/packages/pi-superpowers/` | 提示词自动安装的默认克隆位置 |
