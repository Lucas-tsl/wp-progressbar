
document.addEventListener('DOMContentLoaded', function () {
    function convertCurrencyStringToFloat(currencyString) {
        let cleanedString = currencyString.replace('€', '').trim().replace(',', '.');
        return parseFloat(cleanedString);
    }

    function observeSubTotal(element) {
        if (!element) return;
        const config = { childList: true, characterData: true, subtree: true };
        const callback = function (mutationsList) {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    console.log('Sous-total changé :', element.textContent);
                    updateProgressBar(element.textContent);
                }
            }
        };
        new MutationObserver(callback).observe(element, config);
    }

    function waitForSubTotalElement(container, timeout = 5000, interval = 100) {
        return new Promise((resolve, reject) => {
            const startTime = Date.now();
            const checkExist = setInterval(() => {
                const subTotalElement = container.querySelector('.wc-block-components-totals-item__value');
                if (subTotalElement) {
                    clearInterval(checkExist);
                    resolve(subTotalElement);
                } else if (Date.now() - startTime > timeout) {
                    clearInterval(checkExist);
                    reject(new Error('Timeout waiting for sub-total element'));
                }
            }, interval);
        });
    }

    function observeMiniCart() {
        const miniCartClass = 'wc-block-components-drawer__screen-overlay';
        const config = { childList: true, subtree: true };
        const callback = function (mutationsList) {
            for (const mutation of mutationsList) {
                for (const addedNode of mutation.addedNodes) {
                    if (addedNode.nodeType === 1 && addedNode.classList.contains(miniCartClass)) {
                        waitForSubTotalElement(addedNode).then(subTotalElement => {
                            console.log('Mini panier créé, sous-total :', subTotalElement);
                            observeSubTotal(subTotalElement);
                            updateProgressBar(subTotalElement.textContent);
                        }).catch(console.error);
                    }
                }
            }
        };
        new MutationObserver(callback).observe(document.body, config);
    }

    function updateProgressBar(subTotalText) {
        if (!subTotalText) return;
        let text = document.getElementById('text-indicator');
        let goal = 40;
        let bar_max = goal + 26;
        let subTotal = convertCurrencyStringToFloat(subTotalText);
        let progress = Math.min(100, (subTotal / bar_max) * 100);
        let progressBarFill = document.querySelector('.progress-bar-fill');

        if (subTotal < goal) {
            let calcul = (goal - subTotal).toFixed(2);
            text.innerHTML = `Plus que <strong>${calcul} €</strong> avant la livraison gratuite de votre commande !`;
        } else {
            text.innerHTML = "La livraison de votre commande est gratuite !";
        }

        if (progressBarFill && text) {
            progressBarFill.style.width = progress + '%';
        } else {
            console.error('Progress bar elements not found.');
        }
    }

    observeMiniCart();
});
