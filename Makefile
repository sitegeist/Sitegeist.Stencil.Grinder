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

export TS_NODE_PROJECT=./tsconfig.json
export HOST_USER=$(shell id -u)
export HOST_GROUP=$(shell id -g)
export EXAMPLE := neos-stencil-nextjs

COMPOSE=docker-compose -f ./Examples/$(EXAMPLE)/docker-compose.yaml
COMPOSE_EXEC=$(COMPOSE) exec -T --user $(HOST_USER)
COMPOSE_EXEC_ROOT=$(COMPOSE) exec -T --user root

###############################################################################
#                                   RUN                                       #
###############################################################################
run::
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

restart::
	@$(MAKE) -s down
	@$(MAKE) -s run

logs::
	@$(COMPOSE) logs -f $(container)

ps::
	@$(COMPOSE) ps

ssh::
	@$(COMPOSE) exec --user $(HOST_USER) backend bash
