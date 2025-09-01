/**
 * 上传截图到 OSS 并返回 URL
 * @param buffer - 截图的 Buffer
 * @param filename - 文件名，可选，默认 screenshot.png
 */
export async function uploadToOSS(
  buffer: any,
  filename = 'screenshot.png',
): Promise<{ url: string, name?: string, os?: string }> {
  const uploadUrl = 'https://api.ryanuo.cc/api/meituan'

  const form = new FormData() as any
  form.append('file', buffer, { filename, contentType: 'image/png' })

  try {
    const res = await fetch(uploadUrl, {
      method: 'POST',
      body: form,
      headers: {
        // 仅添加必要 headers，FormData 会自动设置 Content-Type
        Accept: '*/*',
      },
    })

    if (!res.ok) {
      throw new Error(`Upload failed with status ${res.status}`)
    }

    const data = await res.json()

    // 根据你的接口返回结构调整
    // 例如美团接口返回 { Jobs, Name, os }
    if (data.Jobs) {
      return {
        url: data.Jobs,
        name: data.Name || filename,
        os: data.os || 'node-oss',
      }
    }
    else {
      throw new Error(`Upload failed, response: ${JSON.stringify(data)}`)
    }
  }
  catch (err: any) {
    console.error('uploadToOSS error:', err)
    throw err
  }
}
