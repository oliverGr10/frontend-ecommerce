
export const resizeImageToBase64 = async (file: File, maxWidth: number, maxHeight: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
                const newWidth = img.width * ratio;
                const newHeight = img.height * ratio;
                
                canvas.width = newWidth;
                canvas.height = newHeight;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, newWidth, newHeight);
                
                resolve(canvas.toDataURL('image/jpeg', 0.8));
            };
            
            img.onerror = (error) => {
                reject(new Error('Error al cargar la imagen: ' + error));
            };
            
            img.src = e.target?.result as string;
        };
        
        reader.onerror = (error) => {
            reject(new Error('Error al leer el archivo: ' + error));
        };
        
        reader.readAsDataURL(file);
    });
};

export const validateImageDimensions = async (file: File): Promise<boolean> => {
    
    if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/avif') {
        console.error('Formato no soportado. Solo se permiten JPEG, PNG o AVIF.');
        return false;
    }
    
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                resolve(img.width <= 1920 && img.height <= 1080);
            };
            img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    });
};
  