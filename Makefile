.PHONY: install

install:
	pnpm add --save-dev prettier
	pnpm add --save-dev typescript
	pnpm add --save-dev jest @types/jest
	pnpm add --save-dev babel-jest @babel/core @babel/preset-env
	pnpm add --save-dev @babel/preset-typescript

execute:
	npx tsc --init
