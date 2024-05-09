import { encrypt, decrypt } from 'cipher-guard';
import chalk from 'chalk';

const handleCipher = () => {
    const [envKeyRounds, envSalt] = [Bun.env?.cipherGuardKeyRounds, Bun.env?.cipherGuardSalt];
    const isDataFromEnv = (envKeyRounds && envSalt);
    let toLoop = true;
    while (toLoop) {
        console.clear();
        const choice = prompt("What do you want to do?" + chalk.hex("#03e45d")("\ne - Encrypt") + chalk.hex("#d31616")("\nd - Decrypt") + "\nEnter your choice: ").toLowerCase().trim();
        let text, keyRounds__str, salt, keyRounds, encryptedText, decryptedText;
        console.clear();
        switch (choice) {
            case "e":
                text = prompt(chalk.hex("#00d5ff")("Enter the text to encrypt: ")).trim();
                keyRounds__str = envKeyRounds ?? prompt(chalk.hex("#00d5ff")("Enter the key rounds (0-127): ")).trim();
                salt = envSalt ?? prompt(chalk.hex("00d5ff")("Enter the salt: ")).trim();

                try {
                    keyRounds = parseInt(keyRounds__str);
                    if (keyRounds > 127 || keyRounds < 0) throw new Error("Invalid Key Rounds");
                } catch (error) {
                    return console.log(chalk.bgHex("#ff0000")(chalk.white("Invalid Key Rounds:")) + " The key rounds should be a number between 0 and 127.");
                }

                if (!text || !keyRounds__str || !salt) return console.log(chalk.bgHex("#ff0000")(chalk.white("Missing Values:")) + " The 'text', 'key-rounds' and 'salt' parameters are required for encryption.");

                try {
                    encryptedText = encrypt(text, keyRounds, salt);
                    console.clear();
                    console.log("Encrypted text: " + chalk.hex("#ff9100")(encryptedText) + (isDataFromEnv ? chalk.gray(` with key rounds and salt form env`) : chalk.gray(` with key rounds: ${chalk.yellow(keyRounds)} and salt: ${chalk.yellow(salt)}`)))
                } catch (error) {
                    console.log(chalk.bgHex("#ff0000")(chalk.white("Error:")) + " " + error.message);
                }

                break;

            case "d":
                encryptedText = prompt(chalk.hex("#00d5ff")("Enter the encrypted text: ")).trim();
                keyRounds__str = envKeyRounds ?? prompt(chalk.hex("#00d5ff")("Enter the key rounds (0-127): ")).trim();
                salt = envSalt ?? prompt(chalk.hex("#00d5ff")("Enter the salt: ")).trim();

                try {
                    keyRounds = parseInt(keyRounds__str);
                    if (keyRounds > 127 || keyRounds < 0) throw new Error("Invalid Key Rounds");
                } catch (error) {
                    return console.log(chalk.bgHex("#ff0000")("Invalid Key Rounds:") + " The key rounds should be a number between 0 and 127.");
                }

                if (!encryptedText || !keyRounds__str || !salt) return console.log(chalk.bgHex("#ff0000")(chalk.white("Missing Values:")) + " The 'encrypted-text', 'key-rounds' and 'salt' parameters are required for decryption.");

                try {
                    decryptedText = decrypt(encryptedText, keyRounds, salt);
                    console.clear();
                    console.log("Decrypted text: " + chalk.hex("#ff9100")(decryptedText) + (isDataFromEnv ? chalk.gray(` with key rounds and salt form env`) : chalk.gray(` with key rounds: ${chalk.yellow(keyRounds)} and salt: ${chalk.yellow(salt)}`)))
                } catch (error) {
                    console.log(chalk.bgHex("#ff0000")(chalk.white("Error:")) + " " + error.message);
                }

                break;
            default:
                console.error(`Invalid choice! Please choose ${chalk.hex("#03e45d")("e")} for encryption and ${chalk.hex("#d31616")("d")} for decryption`);
                break;
        }
        toLoop = prompt("Do you want to continue? (Y/N): ").toLowerCase().trim() === "y" ? true : false;
    }
};

handleCipher();
