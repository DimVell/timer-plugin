import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Timer extension is now active!');

	const disposable = vscode.commands.registerCommand('timer-plugin.startTimer', async () => {

		const input = await vscode.window.showInputBox({
			prompt: 'Введите длительность таймера в секундах',
			validateInput: (value) => isNaN(Number(value)) || Number(value) <= 0 ? 'Введите положительное число' : null
		});

		if (!input) {
			return;
		}

		let seconds = Number(input);
		vscode.window.showInformationMessage(`Таймер на ${seconds} секунд запущен!`);

		const interval = setInterval(() => {
			seconds--;
			if (seconds > 0) {
				vscode.window.showInformationMessage(`Осталось ${seconds} секунд`);
			} else {
				clearInterval(interval);
				vscode.window.showInformationMessage('Время вышло!');
			}
		}, 1000);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
