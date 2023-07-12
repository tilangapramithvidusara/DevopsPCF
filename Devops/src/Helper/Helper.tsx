// Function to encode JSON to Base64
export const encodeJSONToBase64 = (jsonData: object): string => {
  const jsonString: string = JSON.stringify(jsonData);

  // Convert the JSON string to a byte array
  const encoder: TextEncoder = new TextEncoder();
  const byteArray: Uint8Array = encoder.encode(jsonString);

  // Convert the byte array to Base64
  const base64String: string = btoa(String.fromCharCode(...Array.from(byteArray)));

  return base64String;
}

// Function to decode Base64 to JSON
export const decodeBase64ToJSON = (base64String: string): object => {
  // Decode the Base64 string to a byte array
  const byteArray: Uint8Array = new Uint8Array(atob(base64String).split('').map((char) => char.charCodeAt(0)));

  // Convert the byte array to a string
  const decoder: TextDecoder = new TextDecoder();
  const jsonString: string = decoder.decode(byteArray);

  // Parse the string back into a JSON object
  const jsonData: object = JSON.parse(jsonString);

  return jsonData;
}

export const base64ToByteArray = (base64: string): Uint8Array => {
  const binaryString = atob(base64);
  const length = binaryString.length;
  const byteArray = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }

  return byteArray;
}

export const byteArrayToBase64 = (byteArray: Uint8Array): string => {
  let binaryString = '';
  const length = byteArray.length;

  for (let i = 0; i < length; i++) {
    binaryString += String.fromCharCode(byteArray[i]);
  }

  return btoa(binaryString);
}