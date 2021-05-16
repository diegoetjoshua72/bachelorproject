include deps.mk

%.dko: %.dk
	dkcheck -e $<
