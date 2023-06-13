// Bloqueando alertas de segurança do Google
Object.defineProperty(window, 'alert', {
    get: function() {
        return function(message) {
            if (!message.toLowerCase().includes("google")) {
                original_alert(message);
            }
        };
    },
    configurable: true
});

// Bloqueando alertas de segurança de outros mecanismos
var original_alert = window.alert;
Object.defineProperty(window, 'alert', {
    get: function() {
        return function(message) {
            if (!message.toLowerCase().includes("security")) {
                original_alert(message);
            }
        };
    },
    configurable: true
});

// Bloqueando bots com a função POST
if (window.XMLHttpRequest) {
    var originalOpen = window.XMLHttpRequest.prototype.open;
    window.XMLHttpRequest.prototype.open = function(method, url) {
        if (!url.toLowerCase().includes("bot")) {
            originalOpen.apply(this, arguments);
        }
    };
}

// Bloqueando a exibição da URL no navegador
if (window.history.replaceState) {
    var originalReplaceState = window.history.replaceState;
    window.history.replaceState = function(stateObj, title, url) {
        if (url !== window.location.href) {
            var fakeUrl = "https://google.com"; // URL falsa para enganar bots
            originalReplaceState.call(this, stateObj, title, fakeUrl);
        }
    };
}

// Redirecionando para uma conexão HTTPS
if (window.location.protocol !== "https:") {
    window.location.href = window.location.href.replace(/^http:/, "https:");
}
