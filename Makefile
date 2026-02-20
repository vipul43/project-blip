SHELL := /bin/bash

BACKEND_DIR := backend-blip
FRONTEND_DIR := frontend-blip

.PHONY: help install install-backend install-frontend dev-backend dev-frontend start-backend build-frontend lint-frontend clean

help:
	@echo "Project BLiP Make targets:"
	@echo "  make install           - Install backend and frontend dependencies"
	@echo "  make install-backend   - Install backend dependencies"
	@echo "  make install-frontend  - Install frontend dependencies"
	@echo "  make dev-backend       - Run backend in watch mode"
	@echo "  make dev-frontend      - Run frontend dev server"
	@echo "  make start-backend     - Run backend in production mode"
	@echo "  make build-frontend    - Build frontend for production"
	@echo "  make lint-frontend     - Run frontend lint checks"
	@echo "  make clean             - Remove node_modules in both apps"

install: install-backend install-frontend

install-backend:
	npm --prefix $(BACKEND_DIR) install

install-frontend:
	npm --prefix $(FRONTEND_DIR) install

dev-backend:
	npm --prefix $(BACKEND_DIR) run dev

dev-frontend:
	npm --prefix $(FRONTEND_DIR) run dev

start-backend:
	npm --prefix $(BACKEND_DIR) run start

build-frontend:
	npm --prefix $(FRONTEND_DIR) run build

lint-frontend:
	npm --prefix $(FRONTEND_DIR) run lint

clean:
	rm -rf $(BACKEND_DIR)/node_modules $(FRONTEND_DIR)/node_modules
