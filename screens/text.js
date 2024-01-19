import { View, Text } from 'react-native'
import React from 'react'

const Extract = () => {
    // tesseract js 
    function handleImageUpload(event) {
      const file = event.target.files[0];
    
      if (file) {
        recognizeImage(file);
      }
    }
    async function recognizeImage(imageFile) {
      const { data: { text } } = await Tesseract.recognize(imageFile, 'eng');
      const jsonData = { text }; // Create a JSON object with the extracted text

      console.log("json data is"+text);
      // 'text' now contains the extracted text from the image
      console.log('Extracted Text:', text);
    }
  return (
    <View>
      <Text>Extract</Text>
      
    </View>
  )
}

export default Extract
