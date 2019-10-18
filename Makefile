###############################################################################
###############################################################################
##                                                                           ##
##                         Sitegeist.Stencil.Grinder                         ##
##                                                                           ##
###############################################################################
###############################################################################

#
# @author Wilhelm Behncke <behncke@sitegeist.de>
#

###############################################################################
#                                VARIABLES                                    #
###############################################################################
SHELL=/bin/bash

export PATH := ./node_modules/.bin:$(PATH)
export TS_NODE_PROJECT := ./tsconfig.json
export HOST_USER := $(shell id -u)
export HOST_GROUP := $(shell id -g)
export EXAMPLE := neos-stencil-nextjs
export PORT := 8081
export container := backend

COMPOSE=docker-compose -f ./Examples/$(EXAMPLE)/docker-compose.yaml
COMPOSE_EXEC=$(COMPOSE) exec -T --user $(HOST_USER)
COMPOSE_EXEC_ROOT=$(COMPOSE) exec -T --user root

###############################################################################
#                                   RUN                                       #
###############################################################################
run::
	@yarn && lerna bootstrap
	@$(MAKE) -s build
	@$(COMPOSE) up -d --force-recreate
	@$(COMPOSE_EXEC) backend composer install
	@$(COMPOSE_EXEC) backend mkdir -p /project/dist/Data/DoctrineMigrations
	@$(COMPOSE_EXEC) backend php -d memory_limit=-1 ./flow flow:cache:flush --force
	@$(COMPOSE_EXEC) backend php -d memory_limit=-1 ./flow flow:package:rescan --force
	@$(COMPOSE_EXEC) backend php -d memory_limit=-1 ./flow doctrine:migrate
	@$(COMPOSE_EXEC) backend php -d memory_limit=-1 ./flow resource:publish
	@$(COMPOSE_EXEC) backend php -d memory_limit=-1 ./flow site:import --package-key Vendor.Site &>/dev/null && echo "Imported Vendor.Site" || true
	@$(COMPOSE_EXEC) backend php -d memory_limit=-1 ./flow user:create --roles Administrator admin admin admin admin &>/dev/null && echo "Created user admin" || true

down::
	@$(COMPOSE) down --remove-orphans --volumes
	@$(COMPOSE) rm -vsf

save::
	@$(COMPOSE_EXEC) backend php -d memory_limit=-1 ./flow site:export --package-key Vendor.Site

reset::
	@$(MAKE) -s down
	@$(MAKE) -s run

restart::
	@$(COMPOSE) restart $(container)

logs::
	@$(COMPOSE) logs -f $(container)

ps::
	@$(COMPOSE) ps

ssh::
	@$(COMPOSE) exec --user $(HOST_USER) $(container) bash

###############################################################################
#                                  BUILD                                      #
###############################################################################
build::
	@yarn && lerna run build

###############################################################################
#                                   TEST                                      #
###############################################################################
test::
	@jest
