import logo from './logo.svg';
import logo_icon from './logo_icon.svg';
import remove_bg_icon from './remove_bg_icon.svg';
import upload_icon from './upload_icon.svg';
import download_icon from './download_icon.svg';
import image_w_bg from './image_w_bg.png';
import image_wo_bg from './image_wo_bg.png';
import credit_icon from './credit_icon.png';


export const assets = {
    logo,
    logo_icon,
    remove_bg_icon,
    upload_icon,
    download_icon,
    image_w_bg,
    image_wo_bg,
    credit_icon,
};

export const plans = [
    {
        id: 'Basic',
        price: 10,
        credits: 100,
        desc: 'Best for personal use.'
    },
    {
        id: 'Advanced',
        price: 50,
        credits: 500,
        desc: 'Best for business use.'
    },
    {
        id: 'Business',
        price: 250,
        credits: 5000,
        desc: 'Best for enterprise use.'
    },
];
