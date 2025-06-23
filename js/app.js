
if (jQuery('.page-product').length > 0) {
    if (jQuery('.fotosCompreJunto').length > 0) {
        var aux;
        jQuery.each(jQuery('.fotosCompreJunto .produto img'), function () {
            aux = jQuery(this).attr('src');
            aux = aux.replace('/90_', '/180_');
            jQuery(this).attr('src', aux);
        });
    }

    jQuery('.varTit').each(function(){
        jQuery(this).text( jQuery(this).text().replace(':', '') );
    })

    jQuery('.fotosCompreJunto>div').unwrap()
    
    jQuery('.precoCompreJunto').before( "<div class='equal color'>=</div>" );

    jQuery('[id*="form_compre_junto"]').append(jQuery(".comprejunto_botao"))

    jQuery('.compreJunto').show()

    jQuery('.precoCompreJunto').append(jQuery(".comprejunto_botao"))
}

jQuery(document).ready(function () {
    jQuery('.selected .filter__block .filter__list .filter__item ').on('click', function () {
        setTimeout(() => {
            jQuery('.filter__form').submit()
        }, 500);
    });
})


// Inject shipping calculator on product page
if (jQuery('.page-product').length > 0) {
    jQuery(document).ready(function () {
        // Check if shipping calculator doesn't already exist
        if (jQuery('#calculoFrete').length === 0) {
            // Find where to inject (after product actions or before gifts)
            const targetElement = jQuery('.page-product__actions').length ? 
                jQuery('.page-product__actions') : 
                jQuery('.product-primary-infos-wrapper');
            
            if (targetElement.length) {
                const shippingHTML = `
                    <div class="js-shipping-injected">
                        <h3>Calcular Frete e Prazo</h3>
                        <div class="shipping-form">
                            <input type="text" id="js-cep-input" placeholder="Digite seu CEP" maxlength="9">
                            <button type="button" id="js-calc-shipping">Calcular Frete</button>
                        </div>
                        <div class="shipping-results" id="js-shipping-results"></div>
                    </div>
                `;
                
                targetElement.after(shippingHTML);
                
                // Add event listener for shipping calculation
                jQuery('#js-calc-shipping').on('click', function() {
                    const cep = jQuery('#js-cep-input').val().replace(/\D/g, '');
                    
                    if (cep.length !== 8) {
                        alert('Por favor, digite um CEP válido com 8 dígitos.');
                        return;
                    }
                    
                    // Show loading
                    jQuery('#js-shipping-results').html('<p>Calculando frete...</p>').addClass('show');
                    
                    // Make AJAX call to Tray's shipping API
                    const productId = jQuery('.page-product').attr('data-product-id') || 
                                    jQuery('input[name="product_id"]').val() ||
                                    window.location.pathname.match(/\d+/)?.[0];
                    
                    if (productId) {
                        // Use Tray's shipping calculation endpoint
                        jQuery.ajax({
                            url: '/web_api/shipping_calculation/',
                            method: 'POST',
                            data: {
                                product_id: productId,
                                cep: cep,
                                quantity: 1
                            },
                            success: function(response) {
                                displayShippingResults(response);
                            },
                            error: function() {
                                jQuery('#js-shipping-results').html('<p style="color: red;">Erro ao calcular frete. Tente novamente.</p>');
                            }
                        });
                    } else {
                        jQuery('#js-shipping-results').html('<p style="color: red;">Produto não encontrado para cálculo de frete.</p>');
                    }
                });
                
                // Format CEP input
                jQuery('#js-cep-input').on('input', function() {
                    let value = jQuery(this).val().replace(/\D/g, '');
                    if (value.length >= 5) {
                        value = value.replace(/^(\d{5})(\d)/, '$1-$2');
                    }
                    jQuery(this).val(value);
                });
            }
        }
        
        function displayShippingResults(response) {
            let html = '';
            
            if (response && response.shipping_options && response.shipping_options.length > 0) {
                response.shipping_options.forEach(function(option) {
                    html += `
                        <div class="shipping-option">
                            <div class="shipping-name">${option.name}</div>
                            <div class="shipping-price">R$ ${option.price}</div>
                            <div class="shipping-time">${option.delivery_time}</div>
                        </div>
                    `;
                });
            } else {
                html = '<p>Não foi possível calcular o frete para este CEP.</p>';
            }
            
            jQuery('#js-shipping-results').html(html).addClass('show');
        }
    });
}

jQuery(document).ready(function () {
    //Escurecer a página nos hovers no desktop:
    if (jQuery(window).width() > 991) {

        jQuery('.menu__item--nv1.menu__item--has-child').on('mouseover', function () {
            jQuery('.fade-on').addClass('fade-open');
        });

        jQuery('.menu__item--nv1.menu__item--has-child').on('mouseout', function () {
            jQuery('.fade-on').removeClass('fade-open');
        });

        jQuery('.menu__item.menu__item--nv1.menu--all').on('mouseover', function () {
            jQuery('.fade-on').addClass('fade-open');
        });
        
        jQuery('.menu__item.menu__item--nv1.menu--all').on('mouseout', function () {
            jQuery('.fade-on').removeClass('fade-open');
        });
    }
})

jQuery('.button--menu').click(function() {
    jQuery('body').addClass('menu__open')
});

jQuery('.button__close--navigation').click(function() {
    jQuery('body').removeClass('menu__open')
});


 

nArrow = `<button aria-label="next" type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" width="11.75" height="20" viewBox="0 0 11.75 20"> <path id="Caminho_148" data-name="Caminho 148" d="M101.8,9.22l8.9-8.9a1.1,1.1,0,0,1,1.547,0l.655.655a1.1,1.1,0,0,1,0,1.547L105.426,10l7.482,7.482a1.1,1.1,0,0,1,0,1.547l-.655.655a1.1,1.1,0,0,1-1.547,0L101.8,10.772a1.1,1.1,0,0,1,0-1.553Z" transform="translate(-101.478 0)" /> </svg></button>`;
pArrow = `<button aria-label="prev" type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="11.75" height="20" viewBox="0 0 11.75 20"> <g id="_271228" data-name="271228" opacity="1"> <g id="Grupo_317" data-name="Grupo 317" transform="translate(0)"> <path id="Caminho_148" data-name="Caminho 148" d="M101.8,9.22l8.9-8.9a1.1,1.1,0,0,1,1.547,0l.655.655a1.1,1.1,0,0,1,0,1.547L105.426,10l7.482,7.482a1.1,1.1,0,0,1,0,1.547l-.655.655a1.1,1.1,0,0,1-1.547,0L101.8,10.772a1.1,1.1,0,0,1,0-1.553Z" transform="translate(-101.478 0)"/> </g> </g> </svg></button>`;


if (jQuery('.showcase__list[data-carousel=on]')) {
    jQuery('.showcase__list[data-carousel=on]').each(function () {
        jQuery(this).find('.showcase__item--empty').remove();
        jQuery(this).not('.slick-initialized').slick({
            mobileFirst: false,
            slidesToShow: 4,
            slidesToScroll: 4,
            prevArrow: pArrow,
            nextArrow: nArrow,
            infinite: true,
            responsive: [
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 960,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                }
            ]
        });
    });

}

jQuery(document).ready(function ($) {
    if (jQuery('.products-related .showcase__list')) {
        jQuery('.products-related .showcase__list').each(function () {
            jQuery(this).not('.slick-initialized').slick({
                mobileFirst: false,
                slidesToShow: 4,
                slidesToScroll: 4,
                prevArrow: pArrow,
                nextArrow: nArrow,
                responsive: [
                    {
                        breakpoint: 640,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 960,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3
                        }
                    }
                ]
            });
        });
    }
})
// jQuery('.page-contact .btn_submit').remove()
// jQuery('.page-contact .formulario-contato').append('<button  name="imagem" id="imagem">Enviar</button>')
// jQuery('.form_depto .btn_submit').remove()
// jQuery('.form_depto').append('<button  name="imagem" id="imagem">Enviar</button>')

jQuery(document).ready(function () {

    //ESCONDER ITENS NO SCROLL MOBLIE
    let body = document.querySelector('body');
    let currentTop = 0;
    let oldTop = 0;
    let headerTop = document.querySelector('#header').offsetHeight;

    body.setAttribute('data-scrolling', false);
    body.setAttribute('data-scrolling-mode', 'none');

    window.addEventListener('scroll', () => {
        currentTop = window.pageYOffset;

        if (currentTop == 0) body.setAttribute('data-scrolling', false);
        else body.setAttribute('data-scrolling', true);

        if (currentTop > headerTop) {
            if (oldTop > currentTop) {
                body.setAttribute('data-scrolling-mode', 'up');
            } else if (oldTop < currentTop) {
                body.setAttribute('data-scrolling-mode', 'down');
            } else {
                body.setAttribute('data-scrolling-mode', 'none');
            }
            oldTop = currentTop;
        } else body.setAttribute('data-scrolling-mode', 'none');
    });

});


if (jQuery(".page-product").length > 0) {
    (function ($) {
        jQuery(document).ready(function ($) {

            jQuery(document).ajaxComplete(function (event, xhr, settings) {
                if (settings.url.indexOf("cart_preview") !== -1) {
                    var UPDATECART = new CustomEvent('UPDATECART');
                    window.dispatchEvent(UPDATECART);
                }
            });
        })
        jQuery("#foto_p").removeAttr("data-target")
    })(jQuery);

    jQuery(document).ajaxComplete(function (event, xhr, settings) {
        jQuery('#plus').remove();
        jQuery('#minus').remove();

        if (jQuery('.page-product').length > 0) {

            jQuery('.page-product .brinde_detalhes .botao .pointer').attr("src", "http://images.tcdn.com.br/files/1054801/themes/3/img/enviarbrinde.png");

            jQuery('#quant').before('<button type="button" id="minus" class="product__quantity__button" > - </button> ');
            jQuery('#quant').after('<button type="button" id="plus"  class="product__quantity__button" > + </button> ');
            
            jQuery('#precoDe').text(jQuery('#precoDe').text().replace('De', ''))
            
            if(jQuery('#foto_p').find('.flags__ul').length == 0){
                jQuery('.page-product__image .flags__ul').clone().appendTo('#foto_p')
            }
        }

        if (jQuery("#vars0").length > 0) {
            jQuery(".product__variations").find("p.varTit").text(jQuery("#vars0").text());
            jQuery(".product-variations__title").find(".product__title").text(jQuery("#vars0").text())
        }

    });

    jQuery(".product-variations__buy").attr('disabled', true);

    jQuery(document).on('click', '#plus', function () {
        var qtd = jQuery('#quant');
        var val = parseInt(qtd.val());

        if (val) {
            qtd.val(val + 1);
        }
    });

    jQuery(document).on('click', '#minus', function () {
        var qtd = jQuery('#quant');
        var val = parseInt(qtd.val());

        if ((val - 1) > 0) {
            qtd.val(--val);
        }
    });


    if (jQuery('.fotosCompreJunto').length > 0) {
        var aux;
        jQuery.each(jQuery('.fotosCompreJunto .produto img'), function () {
            aux = jQuery(this).attr('src');
            aux = aux.replace('/90_', '/180_');
            jQuery(this).attr('src', aux);
        });
    }

    jQuery('.related__list').slick({
        mobileFirst: true,
        centerMode: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        centerPadding: '0px',
        arrows: true,
        dots: false,
        prevArrow: `<button aria-label="prev" type="button" class="slick-prev"><svg width="15px" height="30px" viewBox="0 0 15 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>484040 copy 3</title><desc>Created with Sketch.</desc><g id="Home" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="home-geniosshop" transform="translate(-315.000000, -1060.000000)" fill="#C6C6C6" fill-rule="nonzero"><g id="meio" transform="translate(315.000000, 210.000000)"><g id="vitrine-1" transform="translate(0.000000, 597.000000)"><g id="Group-29" transform="translate(0.000000, 74.000000)"><g id="484040-copy-3" transform="translate(7.500000, 194.000000) scale(-1, 1) translate(-7.500000, -194.000000) translate(0.000000, 179.000000)"><path d="M14.7693385,14.5700195 L1.07282101,0.250914397 C0.896498054,0.0672957198 0.62655642,0.00770428016 0.390642023,0.103774319 C0.154727626,0.198035019 0.000291828794,0.427237354 0.000291828794,0.681361868 L0.000291828794,3.1716537 C0.000291828794,3.33093385 0.0611089494,3.48414397 0.170544747,3.59964981 L10.9718872,15.0004086 L0.170603113,26.4012257 C0.0611673152,26.5167315 0.000350194553,26.6699416 0.000350194553,26.8292218 L0.000350194553,29.3195136 C0.000350194553,29.5736381 0.154785992,29.8028405 0.390700389,29.8971012 C0.466108949,29.9275097 0.545136187,29.9421012 0.622937743,29.9421012 C0.789513619,29.9421012 0.952470817,29.875214 1.07282101,29.7499611 L14.7693385,15.4309144 C14.9991829,15.1901556 14.9991829,14.8107782 14.7693385,14.5700195 Z" id="Path"></path></g></g></g></g></g></g></svg></button>`,
        nextArrow: `<button aria-label="next" type="button" class="slick-next"><svg width="15px" height="30px" viewBox="0 0 15 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>Path</title><desc>Created with Sketch.</desc><g id="Home" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="home-geniosshop" transform="translate(-1590.000000, -1060.000000)" fill="#C6C6C6" fill-rule="nonzero"><g id="meio" transform="translate(315.000000, 210.000000)"><g id="vitrine-1" transform="translate(0.000000, 597.000000)"><g id="Group-29" transform="translate(0.000000, 74.000000)"><g id="484040-copy-2" transform="translate(1275.000000, 179.000000)"><path d="M14.7693385,14.5700195 L1.07282101,0.250914397 C0.896498054,0.0672957198 0.62655642,0.00770428016 0.390642023,0.103774319 C0.154727626,0.198035019 0.000291828794,0.427237354 0.000291828794,0.681361868 L0.000291828794,3.1716537 C0.000291828794,3.33093385 0.0611089494,3.48414397 0.170544747,3.59964981 L10.9718872,15.0004086 L0.170603113,26.4012257 C0.0611673152,26.5167315 0.000350194553,26.6699416 0.000350194553,26.8292218 L0.000350194553,29.3195136 C0.000350194553,29.5736381 0.154785992,29.8028405 0.390700389,29.8971012 C0.466108949,29.9275097 0.545136187,29.9421012 0.622937743,29.9421012 C0.789513619,29.9421012 0.952470817,29.875214 1.07282101,29.7499611 L14.7693385,15.4309144 C14.9991829,15.1901556 14.9991829,14.8107782 14.7693385,14.5700195 Z" id="Path"></path></g></g></g></g></g></g></svg></button>`,
        responsive: [{
            breakpoint: 424,
            settings: {
                centerPadding: '0px',
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 500,
            settings: {
                centerPadding: '00px',
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 767,
            settings: {
                centerPadding: '00px',
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 991,
            settings: {
                centerMode: false,
                dots: false,
                centerPadding: '0px',
                arrows: true,
                slidesToShow: 4,
                slidesToScroll: 4,
            }
        }
        ]
    });


    const prodID = jQuery('.more-payments-modal').attr('id');
    jQuery('.more-payments-content').load('/mvc/store/product/payment_options', { loja: 1016754, IdProd: prodID, });

    setTimeout(function () {
        jQuery('.more-payments-content > li, .more-payments-content > li > a, .more-payments-content > li > table').removeAttr('id');
        if (!jQuery('.more-payments-content .Forma1 li').length) {
            jQuery('.more-payments-content').remove();
        } else {
            jQuery('.more-payments-content').show();
        }
    }, 5000);

    jQuery(".more-payments-trigger").on('click', function () {
        jQuery('.more-payments').toggleClass('open-payment');
    });

    $ = jQuery

    if(jQuery('.product-variations').length > 0) {

        jQuery(document).on('click', '#quant-more', function () {
            var qty = jQuery(this).siblings('.qty__input');
            var val = parseInt(qty.val());
            if (val >= 0) {
                qty.val(Number(val + 1));
                jQuery(qty).trigger('change');
            }
            console.log(qty.val())
        });

        jQuery(document).on('click', '#quant-minus', function () {
            var qty = jQuery(this).siblings('.qty__input');
            var val = parseInt(qty.val());
            if ((val - 1) >= 0)
                qty.val(Number(val - 1));
                jQuery(qty).trigger('change');
            console.log(qty.val())
        });

        var $productVariations = jQuery('.product-variations'),
            id = jQuery('.product-variations').data('product'),
            cart;

        var dataVariant = [];

        function getAllData(page) {
            var url = "/web_api/variants/?limit=50&product_id=" + id;
            if(page) url += '&page=' + page;

            $.get(url)
                .done(function( response, textStatus, jqXHR ) {
                    $.merge(dataVariant, response.Variants);
                    console.log(response)
                    if(Math.ceil(response.paging.total / response.paging.limit) > parseInt(response.paging.page)) {
                        getAllData(parseInt(response.paging.page) + 1);
                    } else  {
                        buildVariations(dataVariant); 
                    }
                });
        }

        getAllData(1);

        var $qty,
            $input,
            $item,
            value = 0;

        $productVariations.on('change', '.qty__input', function(e) {
            var value = jQuery(this).val(),
                max   = parseInt(jQuery(this).parents('.product-variations__qty').data('max'));

            $item = jQuery(this).parents('.product-variations__item');

            if(value == "" || value == 0) {
                value = 0;
                $item.addClass('product-variations__item--limit-less');
            } else
            if(value > max) {
                value = max;
                $item.addClass('product-variations__item--limit-more');
            } else {
                $item.removeClass('product-variations__item--limit-less');
                $item.removeClass('product-variations__item--limit-more');
            }

            updateQty($item, value);

        });

        // Desnecessário
        // jQuery('#bt_comprar').on('click', function(e){
        //     e.preventDefault();
        // });

        // Ao clicar no comprar do produto com variação, ele verifica a quantidade dos itens e os adiciona no carrinho
        jQuery('.product-variations__buy').on('click', function(e){
            e.preventDefault();
            var cont = 0,
                total = 0,
                items,
                $buy = jQuery(this);

            items = jQuery('.product-variations__item').filter(function(){
                return jQuery(this).attr('data-qty') > 0;
            });
            total = items.length;

            var cartArray = [];
            items.map(function(){
                cart                 = { "Cart": { "session_id": jQuery('html').attr('data-session') } };
                cart.Cart.product_id = jQuery(this).data('productid');
                cart.Cart.variant_id = jQuery(this).data('id');
                cart.Cart.quantity   = jQuery(this).data('qty');

                cart = JSON.stringify(cart);

                cartArray.push(cart)
            });

            contador = 0;
            jQuery('.add-variants-to-cart').addClass('active-variants-div')

            var sendCart = setInterval(() => {
                $.ajax({
                    method: "POST",
                    url: "/web_api/cart/",
                    contentType: "application/json; charset=utf-8",
                    data: cartArray[contador]
                }).done(function( response, textStatus, jqXHR ) {

                    contador++;

                    console.log(response)

                    
                }).fail(function( jqXHR, status, errorThrown ){
                    var response = JSON.parse( jqXHR.responseText );

                    contador++;
                    
                    console.log(response);
                });
                
                console.log('enviou com sucesso = ', contador + ' EH IGUAL A ' + total)

                
                if(contador >= total - 1){
                    window.location = '/loja/cartService.php?loja=' + jQuery('html').data('store') + '&session_id=' + jQuery('html').attr('data-session');
                    jQuery('.add-variants-to-cart').removeClass('active-variants-div')
                    clearInterval(sendCart)
                }
            }, 500);
        });

        jQuery('.select_variation--button').click(function() {
            var boxVar = jQuery(".product-variations");
            if(boxVar.length)
            jQuery('html, body').animate({
                scrollTop: boxVar.offset().top - 150
            }, 500);
        })
    }

    function updateQty($item, value) {
        var items,
            total        = 0,
            from         = 0,
            installment  = 0,
            offprice     = 0,
            $priceFrom   = jQuery('.product-primary-infos-wrapper #precoDe'),
            $price       = jQuery('.product-primary-infos-wrapper #variacaoPreco'),
            $mainPrice   = jQuery('.product-primary-infos-wrapper .PrecoPrincipal'),
            $installment = jQuery('.product-primary-infos-wrapper .txt-cadaparcelas .preco-parc2 span span'),
            $offPrice    = jQuery('.product-primary-infos-wrapper .precoAvista > span');

        value = parseInt(value);
        $item.attr('data-qty', value);
        $item.find('.qty__input').val(value);

        if(value > 0) {
            jQuery($item).addClass('selected__item');

        } else {
            jQuery($item).removeClass('selected__item');  
        }

        items = jQuery('.product-variations__item').filter(function(){
            return jQuery(this).attr('data-qty') > 0;
        })
        .map(function(){
            return {
                'id'         : jQuery(this).data('id'),
                'product_id' : jQuery(this).data('productid'),
                'qty'        : (jQuery(this).data('id') == $item.data('id')) ? value : parseInt(jQuery(this).data('qty')),
                'price_from' : parseFloat(jQuery(this).data('pricefrom')),
                'price'      : parseFloat(jQuery(this).data('price')),
                'offprice'   : parseFloat(jQuery(this).data('offprice')),
                'installment': parseFloat(jQuery(this).data('installment'))
            };
        });

        items.map(function(item){
            from        += this.price_from * this.qty;
            total       += this.price * this.qty;
            installment += this.installment * this.qty;
            offprice    += this.offprice * this.qty;
        });

        $mainPrice.addClass('done');

        if(from != total) {
            $priceFrom.html('De <abbr class="currency" title="BRL"> R$ </abbr>' + from.toFixed(2).replace('.', ','));
        }

        if(offprice != total) {
            $offPrice.html(offprice.toFixed(2).replace('.', ','));
        }

        $price.text(total.toFixed(2).replace('.', ','));

        $installment.html(installment.toFixed(2).replace('.', ','));
        console.log(total)

        if(total == 0) {
            jQuery('#bt_comprar').attr('disabled', true);
            jQuery('.product-variations__buy').attr('disabled', true);
        } else {
            jQuery('#bt_comprar').attr('disabled', false);
            jQuery('.product-variations__buy').attr('disabled', false);
        }
    }

    function verifyPromotion(start, end) {
        var data = new Date();
        var day = data.getFullYear() + '-' + String(data.getMonth() + 1).padStart(2, '0') + '-' + String(data.getDate()).padStart(2, '0');
        if(start <= day && end >= day){
            return true;
        }else{
            return false;
        }
    }

    function buildVariations(data) {
        var variants,
            $variationsList = jQuery('.product-variations__list'),
            html = '',
            aux,
            noStock;

            var newData = data.map(data=> data.Variant);
            newData = sort(newData);

        variants = newData.map(item => {
            var offPrice    = 0,
                installment = 0,
                auxPayment,
                auxInstallment;


            auxPayment = Array.from(item.payment_option_details).filter((payment) => {
                return payment.type == 'bank_billet';
            });

            if(auxPayment.length > 0) {
                offPrice = auxPayment[0].value;
            } else {
                offPrice = item.price;
            }

            auxInstallment = Array.from(item.payment_option_details).filter((payment) => {
                return payment.type == 'credit_card';
            });

            if(auxInstallment.length > 0) {
                installment = auxInstallment[0].value;
            }

            var stock = getStock(item.id);
            return {
                'id'         : item.id,
                'name'       : item.Sku[0].value,
                'product_id' : item.product_id,
                'image_url'  : item.VariantImage[0].https,
                'price_from' : item.price,
                'price'      : verifyPromotion(item.start_promotion, item.end_promotion) ? item.promotional_price : item.price,
                'offprice'   : offPrice,
                'installment': installment,
                'stock'      : stock
            };
        });

        variants.forEach(function(item){

            if(item.stock == 0) {
                noStock = ' product-variations__item--no-stock';
            } else {
                noStock = '';
            }

            html += '<li class="product-variations__item' + noStock + '" data-id="' + item.id + '" data-productid="' + item.product_id + '" data-qty="0" data-pricefrom="' + item.price_from + '" data-price="' + item.price + '" data-offprice="' + item.offprice + '" data-installment="' + item.installment + '">';

            html += '<button class="zoom"><svg class="zoom__icon icon--zoom"><use xlink:href="#icon-search"></use></svg></button>'

            html += '<div class="product-variations__images">' +
                        '<img class="product-variations__image" alt="' + item.name +'" src="' + item.image_url + '"/>' +
                        '<img class="product-variations__zoom" alt="' + item.name +'" src="' + item.image_url + '"/>' +
                    '</div>';

            html += '<span class="product-variations__name">' + item.name + '</span>';

            if(item.offprice) {
                item.offprice = 'R$ ' + item.offprice.replace('.', ',');
                html += '<span class="product-variations__price">' + item.offprice + '<span class="product-variations__Avista"> &#192; vista</span></span>';
            } else { 
                item.price = 'R$ ' + item.price.replace('.', ',');
                html += '<span class="product-variations__price">' + item.price + '<span class="product-variations__unit">/ Unidade</span></span>';
            }

            if(item.stock > 0) {
                var qtdSelect = item.stock;
                var i;
                
                html += '<div class="product-variations__qty" data-min="0" data-max="' + item.stock + '">' + 
                            '<input value="0" class="qty__input" type="number" maxlength="'+ qtdSelect +'">';
                            html +=  '<button id="quant-more">+</button><button id="quant-minus">-</button></input>' +
                        '</div>';
                

                
            } else  {
                html += '<div class="product-variations__unavailable">Produto Indisponivel</div>';
            

                html += '</li>';
            }

        });
        html += '<li class="product-variations__item product-variations__item--empty"></li><li class="product-variations__item product-variations__item--empty"></li><li class="product-variations__item product-variations__item--empty"></li><li class="product-variations__item product-variations__item--empty"></li>';
        $variationsList.append(html);
    }

    function getStock(id) {
        var aux = dataJson;
        var variant = aux.filter(function(item) { return item.id == id; });
        var stock = 0

        if(variant.length) stock = variant[0].stock;

        return stock;
    }

    function sort(data) {
        var aux = dataJson;
        var aux = aux.filter(function(item){
            var a = data.filter(function(v){
                return item.id == v.id;
            });
            return a.length ? true : false;
        });

        return aux.map(function(item){
            return data.filter(function(a){
                return a.id == item.id;
            })[0];
        });
    }

    jQuery(document).on("click", '.zoom', function() {
        jQuery('.page-product__modal-variation').addClass("modal-variation-open");
        let title = jQuery(this).siblings(".product-variations__name").text();
        let image = jQuery(this).siblings(".product-variations__images").find(".product-variations__zoom");
        
        jQuery("#modal-variation").find(".modal-variation__name").text(title);
        jQuery("#modal-variation").find(".modal-variation-image").html(image);
    }) 

    jQuery('.modal-variation-header, .page-product__modal-variation, modal-variation-close').on('click', function() {
        jQuery('.page-product__modal-variation').removeClass('modal-variation-open');
        jQuery('.page-product__modal-variation .modal-variation-image').empty();
        jQuery("#modal-variation").find(".modal-variation__name").empty();
    })  

    
}


jQuery(document).on('thumbs:start', function () {

    aArrow = `<button aria-label="next" type="button" class="slick-next"><svg id="_271228" data-name="271228" xmlns="http://www.w3.org/2000/svg" width="11.75" height="20" viewBox="0 0 11.75 20"><g id="_271228-2" data-name="271228" opacity="0.3"><g id="Group_317" data-name="Group 317" transform="translate(0)"><path id="Path_148" data-name="Path 148" d="M112.909,9.22l-8.9-8.9a1.1,1.1,0,0,0-1.547,0l-.655.655a1.1,1.1,0,0,0,0,1.547L109.28,10,101.8,17.478a1.1,1.1,0,0,0,0,1.547l.655.655a1.1,1.1,0,0,0,1.547,0l8.909-8.908a1.1,1.1,0,0,0,0-1.553Z" transform="translate(-101.478 0)"/></g></g></svg></button>`;
    bArrow = `<button aria-label="prev" type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="11.75" height="20" viewBox="0 0 11.75 20"><g id="_271228" data-name="271228" opacity="0.3"><g id="Group_317" data-name="Group 317" transform="translate(0)"><path id="Path_148" data-name="Path 148" d="M101.8,9.22l8.9-8.9a1.1,1.1,0,0,1,1.547,0l.655.655a1.1,1.1,0,0,1,0,1.547L105.426,10l7.482,7.482a1.1,1.1,0,0,1,0,1.547l-.655.655a1.1,1.1,0,0,1-1.547,0L101.8,10.772a1.1,1.1,0,0,1,0-1.553Z" transform="translate(-101.478 0)"/></g></g></svg></button>`;

    jQuery('.thumbs__list').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        vertical: true,
        dots: false,
        arrows: true,
        nextArrow: aArrow,
        prevArrow: bArrow,
        verticalSwiping: true,

        responsive: [
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: true,
                    nextArrow: aArrow,
                    prevArrow: bArrow,
                    vertical: false,
                    verticalSwiping: false,
                }
            },
            {
                breakpoint: 993,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    vertical: false,
                    verticalSwiping: false,
                }
            }
        ]

    })
})


jQuery(document).ready(function () {
  if (jQuery(".page-search").length) {
    jQuery(".page-search #vitrine-catalogo fieldset [type=image]")
      .after(
        '<button type="submit" class="button-submit" name="submit">Buscar</button>'
      )
      .remove();
  }
});


if( jQuery('.banner--javascript .banner__list[data-carousel="true"]') && jQuery('.banner--javascript .banner__list[data-carousel="true"]').length) {
    jQuery('.banner--javascript .banner__list').not('.slick-initialized').slick({
        mobileFirst: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 424,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]   
    });
}

if(jQuery('.methods[data-carousel="true"]').length) { 
    if (jQuery(window).width() < 991) {
        jQuery('.page-home__mini-banner').slick({
            mobileFirst: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 3000,
            responsive: [
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                }
            ]   
        
        });
    }
}
nArrow = `<button aria-label="next" type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" width="11.75" height="20" viewBox="0 0 11.75 20"> <path id="Caminho_148" data-name="Caminho 148" d="M101.8,9.22l8.9-8.9a1.1,1.1,0,0,1,1.547,0l.655.655a1.1,1.1,0,0,1,0,1.547L105.426,10l7.482,7.482a1.1,1.1,0,0,1,0,1.547l-.655.655a1.1,1.1,0,0,1-1.547,0L101.8,10.772a1.1,1.1,0,0,1,0-1.553Z" transform="translate(-101.478 0)" fill="#BEBFBF"/> </svg></button>`;
pArrow = `<button aria-label="prev" type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="11.75" height="20" viewBox="0 0 11.75 20"> <g id="_271228" data-name="271228" opacity="0.3"> <g id="Grupo_317" data-name="Grupo 317" transform="translate(0)"> <path id="Caminho_148" data-name="Caminho 148" d="M101.8,9.22l8.9-8.9a1.1,1.1,0,0,1,1.547,0l.655.655a1.1,1.1,0,0,1,0,1.547L105.426,10l7.482,7.482a1.1,1.1,0,0,1,0,1.547l-.655.655a1.1,1.1,0,0,1-1.547,0L101.8,10.772a1.1,1.1,0,0,1,0-1.553Z" transform="translate(-101.478 0)" fill="#BEBFBF"/> </g> </g> </svg></button>`;


if (jQuery(window).width() > 991) {
    if (jQuery('.marcas__list[data-carousel="true"]')) {
        jQuery('.marcas__list[data-carousel="true"]').each(function () {
            jQuery(this).not('.slick-initialized').slick({
                mobileFirst: false,
                slidesToShow: 6,
                slidesToScroll: 1,
                dots: false,
                arrows: true,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 3000,
                prevArrow: pArrow,
                nextArrow: nArrow,
                responsive: [
                    {
                        breakpoint: 426,
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    },
                    {
                        breakpoint: 769,
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    },
                ]
            });
        });

    }
} else {
    if (jQuery('.marcas__list[data-carousel="true"]')) {
        jQuery('.marcas__list[data-carousel="true"]').each(function () {
            jQuery(this).not('.slick-initialized').slick({
                mobileFirst: true,
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: false,
                arrows: false,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 3000,
                responsive: [
                    {
                        breakpoint: 426,
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    },
                    {
                        breakpoint: 769,
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    },
                    {
                        breakpoint: 991,
                        settings: 'unslick'
                    },
                ]
            });
        });

    }

}



var controls = Array.from(document.querySelectorAll("[aria-controls]"));
var body = document.querySelector("body");

controls.forEach(control => {
    control.addEventListener("click", evt => {
        var currentTarget = evt.currentTarget;
        var id = `#${currentTarget.getAttribute("aria-controls")}`;

        if (id.indexOf("slick") === -1) {
            var el = document.querySelector(id);
            var currentHidden = el.getAttribute("aria-hidden");
            var hasFixed = el.getAttribute("data-fixed") == "false" ? false : true;

            if (currentHidden != "false" && currentHidden != "true")
                currentHidden = "true";
            if (hasFixed) {
                if (currentHidden === "true") body.classList.add("fixed");
                else body.classList.remove("fixed");
            }

            el.setAttribute("aria-hidden", currentHidden === "true" ? false : true);
        }
    });
});



if (jQuery('.page-product').length > 0) {
    jQuery(document).ready(function ($) {
        var button =jQuery('#bt-submit-comments');

        if(button) {
            var buttonAction =jQuery(`<button class="comments__button" type="button">Avaliar</button>`);
            button.after(buttonAction);

            buttonAction.click(() => {
                button.trigger('click');
            });
        }

    })
}

if(jQuery('.page-comparador').length > 0){
    jQuery('.comparsionFoto').find('img[title=Escolher]').attr('src','https://images.tcdn.com.br/assets/store/img/new.comprar.gif');
}


 


if (jQuery('.instafeed[data-carousel="true"] .instafeed__list') && jQuery('.instafeed[data-carousel="true"] .instafeed__list').length) {
    jQuery('.instafeed[data-carousel="true"] .instafeed__list').not('.slick-initialized').slick({
        mobileFirst: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 240,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6,
                }
            },
        ]
    });
}

// Get cookie function
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);

    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// call getCokkie function and set into exists variable
var exists = getCookie('LGPDAlertToKids');

// check if cookie is active
if (exists != 'true') {

    jQuery("body").addClass("show-lgpd-alert");

    jQuery(".lgpd-alert__close").on("click", function (e) {
        if (e.target === e.currentTarget) {
            jQuery("body").removeClass("show-lgpd-alert");
            window.sessionStorage.setItem("lgpd-alert", 1);
            document.cookie = "LGPDAlertToKids=true";
        }
    });

};






function debounce(func){
    var timer;
    return function(event){
        if(timer) clearTimeout(timer);
        timer = setTimeout(func,200,event);
    };
}

function navigationHiddenResize() {
    var widthNavigation = jQuery('.menu--navigation .menu__ul--nv1').outerWidth();
    var widthCurrent = 0;
    jQuery('.menu--navigation .menu__item--nv1').removeClass('menu__item--hidden');
    jQuery('.menu--navigation .menu__item--nv1').each(function(){
        widthCurrent += jQuery(this).outerWidth();
        if(widthCurrent > widthNavigation) {
            jQuery(this).addClass('menu__item--hidden');
        }
    });
}

function navigationAlign() {
    jQuery('.menu--navigation').each(function(){
        jQuery(this).find('.menu--nv2').removeClass('menu--rtl');
        jQuery(this).find('.menu--nv2').each(function(){
            var nav = jQuery(this).closest('.menu--nv1').outerWidth();
            var left = jQuery(this).offset().left + jQuery(this).outerWidth();

            if(left > nav) {
                
                jQuery(this).addClass('menu--rtl');
            }
        });
    })
}

var childs = Array.from(document.querySelectorAll('.menu__item--has-child'));

childs.forEach((child) => {
    child.addEventListener('click', (evt) => {
        const target = evt.target;
        if (evt.currentTarget === target) {
            var expanded = target.getAttribute('aria-expanded');
            if (expanded !== 'true' && expanded !== 'false') expanded = 'false';
            target.setAttribute('aria-expanded', expanded === 'true' ? false : true);
            jQuery(target).find('> .menu--sub').slideToggle();
        }
    }, false);
});


// window.addEventListener('resize', debounce(function(e){
//     navigationHiddenResize();
//     navigationAlign();
// }));

// navigationHiddenResize();
// navigationAlign();



if(jQuery('.methods[data-carousel="true"]').length) {
    jQuery('.methods__ul').slick({
        slidesToShow: 6,
        infinite: true,
        slidesToScroll: 1,
        prevArrow: `<button aria-label="prev" type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="37.333" viewBox="0 0 20 37.333">
        <path id="Caminho_613" data-name="Caminho 613" d="M17.746-37.614A1.29,1.29,0,0,1,18.68-38a1.29,1.29,0,0,1,.934.386,1.32,1.32,0,0,1,0,1.867L3.188-19.333,19.614-2.92a1.32,1.32,0,0,1,0,1.867,1.322,1.322,0,0,1-1.868,0L.386-18.4a1.32,1.32,0,0,1,0-1.867L17.746-37.614Z" transform="translate(0 38)" fill="#878787" fill-rule="evenodd"/>
      </svg>
      </button>`,
        nextArrow: `<button aria-label="prev" type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="37.333" viewBox="0 0 20 37.333">
        <path id="Caminho_616" data-name="Caminho 616" d="M2.254-37.614A1.29,1.29,0,0,0,1.32-38a1.29,1.29,0,0,0-.934.386,1.32,1.32,0,0,0,0,1.867L16.812-19.333.386-2.92a1.32,1.32,0,0,0,0,1.867,1.322,1.322,0,0,0,1.868,0L19.614-18.4a1.32,1.32,0,0,0,0-1.867L2.254-37.614Z" transform="translate(0 38)" fill="#878787" fill-rule="evenodd"/>
      </svg>
      </button>`,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    autoplaySpeed: 2000
                }
            },
            {
                breakpoint: 426,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows:false
                }
            }        
        ]
    });
    
}


nArrow = `<button aria-label="next" type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="29" viewBox="0 0 16 29"><defs><clipPath id="arrowshowcase1"><path id="Caminho_338" data-name="Caminho 338" d="M0-14.5a2.06,2.06,0,0,1,.575-1.436L12.644-28.405a1.921,1.921,0,0,1,2.78,0,2.079,2.079,0,0,1,0,2.872L4.745-14.5,15.424-3.467a2.079,2.079,0,0,1,0,2.872,1.921,1.921,0,0,1-2.78,0L.575-13.064A2.06,2.06,0,0,1,0-14.5Z"/></clipPath><clipPath id="arrowshowcase2"><path id="Caminho_337" data-name="Caminho 337" d="M-315,5279H1605V-1153H-315Z"/></clipPath></defs><g id="Grupo_387" data-name="Grupo 387" transform="translate(0 29)"><g id="Grupo_386" data-name="Grupo 386" clip-path="url(#arrowshowcase1)"><g id="Grupo_385" data-name="Grupo 385" clip-path="url(#arrowshowcase2)"><path id="Caminho_336" data-name="Caminho 336" d="M21-34V5H-5V-34Z"/></g></g></g></svg></button>`;
pArrow = `<button aria-label="prev" type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="29" viewBox="0 0 16 29"><defs><clipPath id="arrowshowcase1"><path id="Caminho_338" data-name="Caminho 338" d="M0-14.5a2.06,2.06,0,0,1,.575-1.436L12.644-28.405a1.921,1.921,0,0,1,2.78,0,2.079,2.079,0,0,1,0,2.872L4.745-14.5,15.424-3.467a2.079,2.079,0,0,1,0,2.872,1.921,1.921,0,0,1-2.78,0L.575-13.064A2.06,2.06,0,0,1,0-14.5Z"/></clipPath><clipPath id="arrowshowcase2"><path id="Caminho_337" data-name="Caminho 337" d="M-315,5279H1605V-1153H-315Z"/></clipPath></defs><g id="Grupo_387" data-name="Grupo 387" transform="translate(0 29)"><g id="Grupo_386" data-name="Grupo 386" clip-path="url(#arrowshowcase1)"><g id="Grupo_385" data-name="Grupo 385" clip-path="url(#arrowshowcase2)"><path id="Caminho_336" data-name="Caminho 336" d="M21-34V5H-5V-34Z"/></g></g></g></svg></button>`;

jQuery('.news__content').load('/noticias .noticias', function () {
    jQuery('.news').show()

    jQuery('.noticias li').each(function(){
        var href = jQuery(this).find('a').attr('href')
        jQuery(this).find('#noticia_dados').append("<a href="+ href +">Leia mais</a>")
    })

    if (jQuery('.news[data-carousel="true"] ul.noticias').length) {
        jQuery('.news[data-carousel="true"] ul.noticias').not('.slick-initialized').slick({
            mobileFirst: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            autoplay: true,
            arrows: false,
            responsive: [
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                },
            ]
        });
    }
});

if(jQuery('.popupNews').length){
    if (!getCookieValueByName('popupNewsToKids')) {
        createpopupNewsCookies()
    }   
    
    function createpopupNewsCookies () {
        setTimeout(function() {
            jQuery('.popupNews').addClass('openned');
            closePopupNews();
            // validateForm();
        }, 3000)
    }

    function closePopupNews(){
        jQuery('.popupNews__close').on('click', function() {
            jQuery('.popupNews').removeClass('openned');
            setCookies("popupNewsToKids", true, 3);
        })
        jQuery('.popupNews__mask').on('click', function() {
            jQuery('.popupNews').removeClass('openned');
            setCookies("popupNewsToKids", true, 3);
        })
    }
}

var url = window.location.pathname

if(url == "/mvc/store/newsletter/")  {
    setCookies("popupNewsToKids", true, 3);
}


function getCookieValueByName (name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    return parts.length == 2 ? parts.pop().split(";").shift() : false;
}

function setCookies(cname, cvalue, exdays){
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

jQuery(".newsletter__button").on("click", function(e) {
    jQuery(this).parents(".newsletter__form").find(".newsletter__input").each(function() {
        if (jQuery(this).attr("type") == "email") {
            let email = jQuery(this).val()
            if (email !== '' && email.split('@').length > 1 ) {
                if(!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                    e.preventDefault()
                    jQuery(this).parents(".newsletter__form").append("<div class='error'>Email inválido</div>")
                    setTimeout(() => {
                        jQuery(this).parents(".newsletter__form").find(".error").remove()
                    }, 3000);
                }
            }
        }
    })
})


/* Lazy Load  */
document.addEventListener('DOMContentLoaded', function () {
    let lazyImages = [].slice.call(document.querySelectorAll('img.lazy-new'))
    let active = false
    const lazyLoad = function () {
        if (active === false) {
            active = true
            setTimeout(function () {
                lazyImages.forEach(function (lazyImage) {
                    if (
                        lazyImage.getBoundingClientRect().top <=
                        window.innerHeight &&
                        lazyImage.getBoundingClientRect().bottom >= 0 &&
                        getComputedStyle(lazyImage).display !== 'none'
                    ) {
                        lazyImage.src = lazyImage.dataset.src
                        lazyImage.srcset = lazyImage.dataset.srcset

                        lazyImages = lazyImages.filter(function (image) {
                            return image !== lazyImage
                        })

                        if (lazyImages.length === 0) {
                            document.removeEventListener('scroll', lazyLoad)
                            window.removeEventListener('resize', lazyLoad)
                            window.removeEventListener(
                                'orientationchange',
                                lazyLoad
                            )
                        }
                        setTimeout(() => {
                        lazyImage.classList.remove('lazy-new')
                        }, 100);
                    }
                })
                active = false
            }, 200)
        }
    }
    document.addEventListener('scroll', lazyLoad)
    window.addEventListener('resize', lazyLoad)
    window.addEventListener('orientationchange', lazyLoad)
})


jQuery(".tabela-medidas__title").click(function () {
    jQuery(".tabela-medidas__fixed").addClass("tabela-medidas__fixed--on");
    jQuery("body").addClass("tabela-medidas__fixed--body");
});

jQuery(".tabela-medidas__fixed").click(function () {
    jQuery(".tabela-medidas__fixed").removeClass("tabela-medidas__fixed--on");
    jQuery("body").removeClass("tabela-medidas__fixed--body");
});




//Adicionar produto no carrinho
jQuery(document).ready(function () {
    if (jQuery(".product__button").length) {
        jQuery(".product__button").on("click", function () {
            const dataSession = jQuery("html").attr("data-session");
            const dataProdutoId = jQuery(this).attr("data-id");
            const dataQuantity = 1;
            jQuery
                .ajax({
                    method: "POST",
                    url: "/web_api/cart/",
                    contentType: "application/json; charset=utf-8",
                    data:
                        '{"Cart":{"session_id":"' +
                        dataSession +
                        '","product_id":"' +
                        dataProdutoId +
                        '", "quantity":"' +
                        dataQuantity +
                        '" ,"constiant_id":"0"}}',
                })
                .done((response, textStatus, jqXHR) => {
                    jQuery(this)
                        .closest(".product")
                        .append(
                            '<span class="buy__button--ok">Produto adicionado</span>'
                        )
                        jQuery('.cart__info').trigger('click');
                    setTimeout(function () {
                        jQuery(".buy__button--ok").remove();
                    }, 3500);

                    const UPDATECART = new CustomEvent("UPDATECART", {
                        detail: response.data,
                    });
                    window.dispatchEvent(UPDATECART);
                    updateTopbar();
                })
                .fail(function (jqXHR, status, errorThrown) {
                    const response = jQuery.parseJSON(jqXHR.responseText);
                });
        });
    }
});



jQuery(document).ready(function () {
    const fatherDivComments = jQuery('.page-product__comments'); // Seleciona a div com a classe "container"
    const hreviewContainer = fatherDivComments.find('.hreview-comentarios'); // Seleciona os elementos com a classe "classe-especifica" dentro da div

    // Adiciona a classe "minha-classe-adicionada" apenas ao último elemento com a classe "classe-especifica"
    hreviewContainer.last().addClass('noBorderOnTheLastChild');
});


jQuery(".rating-short__container").on('click', function(){
    jQuery('html, body').animate({
        scrollTop: jQuery("#ProdAbas").offset().top
    }, 2000);
});

if (jQuery('.reviews[data-carousel="true"] .dep_lista') && jQuery('.reviews[data-carousel="true"] .dep_lista').length) {
    jQuery('.dep_lista li').not(':visible').remove()
    jQuery('.dep_lista').not('.slick-initialized').slick({
        mobileFirst: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        infinite: true,
        autoplay: true,
        responsive: [
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }
        ]
    });
}
if(jQuery('.rulers[data-carousel="true"] .rulers__list') && jQuery('.rulers[data-carousel="true"] .rulers__list').length) {
    if (jQuery(window).width() < 991) {
        jQuery('.rulers__sep').remove()
        jQuery('.rulers[data-carousel="true"] .rulers__list').not('.slick-initialized').slick({
            mobileFirst: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 3000,
            responsive: [
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                }
            ]   
        });
    }
}





if (jQuery('.produto-imagem-miniaturas #carousel li').length) {
    jQuery("#foto_p").addClass('with-thumb');
} 
else {
    jQuery("#foto_p").addClass('without-thumb');
}

if (typeof jQuery == 'function') {
    jQuery(document).ready(function () {
        jQuery(window).ajaxComplete(function (event, xhr, settings) {
            if (settings) {
                if (settings.url.indexOf('variant_gallery') !== -1) {
                    loadThumb();
                }
            }
        });
        loadThumb();
    });

    function loadThumb() {
        var thumbs = jQuery('.produto-imagem-miniaturas');

        if (thumbs.length) {
            thumbs.hide();

            var images = thumbs.find('img, .icon-video');
            let html;

            if (jQuery('.thumbs').length) jQuery('.thumbs').remove();

            if (images.length) {
                html = `<div class="thumbs">`;
                html += `<ul class="thumbs__list">`;

                images.each((index, item) => {
                    html += createThumb(jQuery(item).attr('src'), index);
                });

                html += `</ul>`;
                html += `</div>`;
                thumbs.after(html);

                jQuery(document).trigger("thumbs:start");

                jQuery('.thumbs a').click((evt) => {
                    let index = jQuery(evt.currentTarget).attr('data-index');

                    selectThumb(index);

                    if (jQuery(evt.currentTarget).find('.thumb__video').length) {
                        jQuery('#colVideo').show();
                    } else {
                        jQuery(jQuery('a', thumbs).eq(index)).mouseover().click();
                        jQuery('#colVideo').hide();
                    }
                    evt.preventDefault();
                });

                selectThumb('0');
            }
        }
    }

    function selectThumb(index) {
        jQuery(`.thumbs li`).removeClass('thumbs__item--actived');
        jQuery(`.thumbs [data-index=${index}]`).closest('li').addClass('thumbs__item--actived');
    }

    function createThumb(src, index) {
        if (src) {
            return `<li class="thumbs__item"><a class="thumbs__link" data-index="${index}" href="#${index}"><img class="thumbs__image" src="${src}" /></a></li>`;
        } else {
            
            let link = jQuery("#colVideo").find("iframe").attr("src");
            link = link.split('/')[4] 
            return `<li class="thumbs__item"><a style="--videoLink: url(https://i3.ytimg.com/vi/${link}/hqdefault.jpg)" class="thumbs__link" data-index="${index}" href="#${index}"><span class="thumb__video"></span></a></li>`;
            
        }
}};

 