import React from 'react';

const ResultPage = ({ result }) => {
    return (
        <div className="container mx-auto p-6 text-center">
            <h1 className="text-3xl font-bold mb-6">Sonuçlar</h1>
            <img
                src={result.imageUrl}
                alt="Sonuç Görseli"
                className="w-full max-w-md mx-auto mb-6 rounded-lg shadow-lg"
            />
            <ul className="text-lg text-gray-700">
                {result.texts.map((text, index) => (
                    <li key={index} className="mb-2">{text}</li>
                ))}
            </ul>
        </div>
    );
};

export default ResultPage;
