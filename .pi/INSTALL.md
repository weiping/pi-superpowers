# pi-superpowers 自动安装指南（AI 执行版）

这是供 Pi AI 自动执行的安装指令。**按步骤顺序执行每条命令，遇到错误立即停止并告知用户原因。**

---

## 环境检查

验证必要工具已安装：

```bash
git --version && node --version && pi --version
```

如果任何命令失败，告知用户缺少哪个工具，停止安装。

---

## 步骤 1：克隆或更新仓库

```bash
if [ -d "$HOME/.pi/packages/pi-superpowers" ]; then
  echo "已存在本地副本，执行更新..."
  cd "$HOME/.pi/packages/pi-superpowers" && git pull
else
  echo "克隆 pi-superpowers..."
  git clone --depth=1 https://github.com/your-org/pi-superpowers.git "$HOME/.pi/packages/pi-superpowers"
fi
```

---

## 步骤 2：向 Pi 注册（全局安装）

```bash
pi install "$HOME/.pi/packages/pi-superpowers"
```

---

## 步骤 3：验证安装

```bash
pi list
```

输出中应包含 `pi-superpowers`。

---

## 完成

所有步骤执行成功后，告知用户：

- ✅ **安装完成**，pi-superpowers 已注册到 Pi 全局配置
- 🔄 **请重启 Pi**（退出并重新启动）使更改生效
- 验证方法：重启后发送任意消息，若看到通知 `✦ pi-superpowers loaded (superpowers skills available)` 即安装成功
- 快速测试：输入 `/头脑风暴 测试一下` 或 `/skill:brainstorming`

---

## 故障处理

### git clone 失败（无网络）

若 GitHub 不可访问，检查本地是否有副本：

```bash
ls "$HOME/repos/pi-superpowers" 2>/dev/null && echo "本地副本存在" || echo "无本地副本"
```

如本地副本存在，改用本地路径安装：

```bash
pi install "$HOME/repos/pi-superpowers"
```

### pi install 失败

确认 Pi 已安装：

```bash
which pi && pi --version
```

### 已安装但需要更新

```bash
cd "$HOME/.pi/packages/pi-superpowers" && git pull
```

更新后重启 Pi 即可，无需重新 `pi install`。
