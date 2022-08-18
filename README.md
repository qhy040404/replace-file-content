# replace-file-content

This is a GitHub action to replace content in files.

这是一个用于替换文件内容的 GitHub action

## How to use / 如何使用

```yaml
- name: Replace secret content
  uses: qhy040404/replace-file-content@v1.0.0
  with:
    file: 'secret.txt' # File to replace
    past: 'secret' # Old content
    content: 'This is a secret' # New content
```