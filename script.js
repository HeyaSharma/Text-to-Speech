document.addEventListener('DOMContentLoaded', () => {
    const synth = window.speechSynthesis;
    const textInput = document.getElementById('text-to-speak');
    const speakButton = document.getElementById('speak-btn');
    const stopButton = document.getElementById('stop-btn');
    const voiceSelect = document.getElementById('voice-select');
    let voices = [];

    function populateVoiceList() {
        voices = synth.getVoices();
        voiceSelect.innerHTML = '';
        voices.forEach(voice => {
            const option = document.createElement('option');
            option.textContent = voice.name + ' (' + voice.lang + ')';
            if (voice.default) {
                option.textContent += ' -- DEFAULT';
            }
            option.setAttribute('data-lang', voice.lang);
            option.setAttribute('data-name', voice.name);
            voiceSelect.appendChild(option);
        });
    }

    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    speakButton.addEventListener('click', () => {
        if (textInput.value !== '') {
            const utterance = new SpeechSynthesisUtterance(textInput.value);
            const selectedVoiceName = voiceSelect.selectedOptions[0].getAttribute('data-name');
            utterance.voice = voices.find(voice => voice.name === selectedVoiceName);
            synth.speak(utterance);
        }
    });

    stopButton.addEventListener('click', () => {
        synth.cancel();
    });
});

