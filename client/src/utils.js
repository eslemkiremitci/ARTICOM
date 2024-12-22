export const apiRequest = async (url, options = {}) => {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`API Hatası: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API isteği sırasında hata:', error.message);
        throw error;
    }
};
