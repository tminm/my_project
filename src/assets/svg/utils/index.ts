function styleStrToObj(str: string): Record<string, string> {
  const obj: Record<string, string> = {};
  const s = str
    .toLowerCase()
    .replace(/-(.)/g, (_, g: string) => g.toUpperCase()) // 将 `-x` 转换为 `X`
    .replace(/;\s?$/g, "") // 移除末尾多余的分号
    .split(/:|;/g); // 按 `:` 或 `;` 分割

  for (let i = 0; i < s.length; i += 2) {
    const key = s[i].replace(/\s/g, ""); // 移除空格
    const value = s[i + 1]?.trim(); // 去除值的首尾空格
    if (key && value !== undefined) {
      obj[key] = value;
    }
  }

  return obj;
}

export { styleStrToObj };
