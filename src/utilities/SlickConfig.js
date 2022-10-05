export let slickSliderHomeConfig = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplaySpeed: 2000,
    lazyLoad: true,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 6,

            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 5,

            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,

            }
        },
        {
            breakpoint: 400,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,

            }
        },

        {
            breakpoint: 200,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ] 
}

export let slickSliderCastconfig = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplaySpeed: 2000,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 1344,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
                
            }
        },
        {
            breakpoint: 900,
            settings:{
                slidesToShow: 3,
                slidesToScroll: 3,
                
            }
        }, 
        {
            breakpoint: 525, 
            settings:{
                slidesToShow: 2,
                slidesToScroll: 2,
               
            }
        }

    
    ] 
}