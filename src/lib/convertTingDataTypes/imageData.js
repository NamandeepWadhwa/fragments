const sharp = require('sharp');

module.exports = async (inputBuffer, outputFormat) => {
 
  try {
    const convertedImageBuffer = await sharp(inputBuffer).toFormat(outputFormat).toBuffer()
 
    
    const response = {
      type: `image/${outputFormat}`,
      data: convertedImageBuffer,
    };
    return response;
    
  } catch (error) {
    console.error('Error during image conversion:', error);
    throw error;
  }
};
