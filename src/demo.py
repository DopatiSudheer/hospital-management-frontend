MORSE_CODE_DICT = { 'A':'.-', 'B':'-...','C':'-.-.', 'D':'-..', 'E':'.',
                    'F':'..-.', 'G':'--.', 'H':'....', 'I':'..', 'J':'.---', 
                    'K':'-.-', 'L':'.-..', 'M':'--', 'N':'-.', 'O':'---', 
                    'P':'.--.', 'Q':'--.-', 'R':'.-.', 'S':'...', 'T':'-',
                    'U':'..-', 'V':'...-', 'W':'.--', 'X':'-..-', 'Y':'-.--', 
                    'Z':'--..', '1':'.----', '2':'..---', '3':'...--',
                    '4':'....-', '5':'.....', '6':'-....', '7':'--...', 
                    '8':'---..', '9':'----.', '0':'-----', ', ':'--..--', 
                    '.':'.-.-.-', '?':'..--..', '/':'-..-.', '-':'-....-',
                    '(':'-.--.', ')':'-.--.-','#':'...---'}
DECODE_DICT = {v: k for k, v in MORSE_CODE_DICT.items()}
DECODE_DICT['/'] = ' '
def translate(user_input):
    is_morse = all(char in ".- /" for char in user_input)
    if is_morse:
        words = user_input.split(' ')
        return ''.join(DECODE_DICT.get(code, '?') for code in words)
    else:
        return ' '.join(MORSE_CODE_DICT.get(char.upper(), '/') for char in user_input)
user_data = input("Enter Text to encode OR Morse to decode: ").strip()
result = translate(user_data)
print("Result:", result)