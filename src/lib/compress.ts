/**
 * Compresses a given object into a compressed string using deflate compression.
 *
 * @param {unknown} obj - The object to compress.
 * @returns {Promise<string>} A promise that resolves to the compressed string.
 */
export async function compress(obj: unknown): Promise<string> {
  const text = JSON.stringify(obj);
  const encode = new TextEncoder().encode(text);
  const upstream = new ReadableStream({
    start(controller) {
      controller.enqueue(encode);
      controller.close();
    },
  });
  const compression = new CompressionStream("deflate");
  const stream = upstream.pipeThrough(compression);
  const compressed = await new Response(stream).arrayBuffer();
  const binaryString = String.fromCharCode(...new Uint8Array(compressed));
  const encoded = escapeURLSafe(btoa(binaryString));
  return encoded;
}

/**
 * Decompresses a compressed string back into an object.
 *
 * @param {string} encoded - The compressed string to decompress.
 * @returns {Promise<unknown>} A promise that resolves to the decompressed object.
 */
export async function decompress(encoded: string): Promise<unknown> {
  // Decode the string and convert to binary string
  const binaryString = atob(unescapeURLSafe(encoded));

  // Convert binary string to Uint8Array
  const buffer = Uint8Array.from(binaryString, (char) => char.charCodeAt(0));

  // Create a ReadableStream from the buffer
  const upstream = new ReadableStream({
    start(controller) {
      controller.enqueue(buffer);
      controller.close();
    },
  });
  // Create a DecompressionStream with 'deflate'
  const decompression = new DecompressionStream("deflate");
  const stream = upstream.pipeThrough(decompression);
  // Read decompressed text and parse as JSON
  const decompressed = await new Response(stream).text();
  return JSON.parse(decompressed);
}

function escapeURLSafe(base64: string) {
  return base64.replace(/\+/g, "-").replace(/\//g, "_");
}

function unescapeURLSafe(base64: string) {
  return base64.replace(/-/g, "+").replace(/_/g, "/");
}
